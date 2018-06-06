// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

'use strict';

function connect(url, options={}, callback) {
  if (!options.adminFacadeVersion) {
    options.adminFacadeVersion = 3;
  }
  if (!options.closeCallback) {
    options.closeCallback = () => {};
  }
  if (!options.debug) {
    options.debug = false;
  }
  if (!options.facades) {
    options.facades = [];
  }
  if (!options.wsclass) {
    options.wsclass = window.WebSocket;
  }
  const ws = new options.wsclass(url);
  ws.onopen = evt => {
    callback(null, new _Client(ws, options));
  }
  ws.onclose = evt => {
    console.log('closing');
    callback('cannot connect WebSocket: ' + evt.reason, null);
  }
}


class _Client {
  
  constructor(ws, options) {
    this._transport = new _Transport(ws, options.closeCallback, options.debug);
    this._facades = options.facades;
    this._adminFacadeVersion = options.adminFacadeVersion;
  }
  
  login(credentials, callback) {
    // TODO: support bakery auth.
    const req = {
      type: 'Admin',
      request: 'Login',
      params: {
        'auth-tag': credentials.user,
        credentials: credentials.password
      },
      version: this._adminFacadeVersion
    }; 
    this._transport.write(req, (err, resp) => {
      if (err) {
        callback(err, {});
        return;
      }
      const conn = new _Connection(this._transport, this._facades, resp);
      callback(null, conn);
    });
  }
  
  logout(callback) {
    this._transport.close(callback);
  }

}


class _Transport {

  constructor(ws, closeCallback, debug) {
    this._ws = ws;
    this._counter = 0;
    this._callbacks = {};
    this._closeCallback = closeCallback;
    this._debug = debug;
    ws.onmessage = evt => {
      if (this._debug) {
        console.debug('<--', evt.data);
      }
      this._handle(evt.data);
    }
    ws.onclose = evt => {
      if (this._debug) {
        console.debug('close:', evt.code, evt.reason);
      }
      this._closeCallback(evt.code);
    }
  }

  write(req, callback) {
    const state = this._ws.readyState;
    if (state !== 1) {
      const reqStr = JSON.stringify(req);
      if (callback) {
        callback(
          `cannot send request ${reqStr}: ` + 
          `connection state ${state} is not open`);
      }
      return;
    }
    this._counter += 1;
    req['request-id'] = this._counter;
    this._callbacks[this._counter] = callback;
    const msg = JSON.stringify(req);
    if (this._debug) {
      console.debug('-->', msg);
    }
    this._ws.send(msg);
  }

  close(callback) {
    const closeCallback = this._closeCallback;
    this._closeCallback = code => {
      callback(code, closeCallback);
    };
    this._ws.close();
  }

  _handle(data) {
    const resp = JSON.parse(data);
    const id = resp['request-id'];
    const callback = this._callbacks[id];
    delete this._callbacks[id];
    if (callback) {
      callback.call(this, resp.error || null, resp.response || {});
    }
  }

}

class _Connection {

  constructor(transport, facades, loginResp) {
    this.transport = transport;
    const userInfo = loginResp['user-info'];
    this.info = {
      controllerAccess: userInfo['controller-access'],
      modelAccess: userInfo['model-access'],
      getFacade: name => {
        return this.facades[name];
      }
      // TODO: add the others.
    };
    const respFacades = loginResp.facades || [];
    const registered = facades.reduce((previous, current) => {
      previous[current.name] = current;
      return previous;
    }, {})
    this.facades = respFacades.reduce((previous, current) => {
      for (let i = current.versions.length-1; i >= 0; i--) {
        const className = current.name + 'V' + current.versions[i];
        const facadeClass = registered[className];
        if (facadeClass) {
          const facadeName = _uncapitalize(current.name);
          previous[facadeName] = new facadeClass(this.transport, this.info);
          return previous;
        }
      }
      return previous;
    }, {});
  }

}

function _uncapitalize(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = {connect: connect};