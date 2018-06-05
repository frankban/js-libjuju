// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

'use strict';

var module = module;

(function(exports) {

  const jujulib = exports.jujulib;

  function connect(url, options={}) {
    if (!options.wsclass) {
      options.wsclass = window.WebSocket;
    }
    if (!options.closeCallback) {
      options.closeCallback = () => {};
    }
    return new _Client(url, options)
  }


  class _Client {
    
    constructor(url, options) {
      this.url = url;
      const ws = new options.wsclass(url);
      this._transport = new _Transport(ws, options.closeCallback)
    }
    
    login(credentials, callback) {
      const req = {}; // TODO: login request, with userpass or macaroons.
      this._transport.write(req, (err, resp) => {
        if (err) {
          callback(err, {});
          return;
        }
        const conn = new Connection(this._transport, resp);
        callback(null, conn);
      });
    }
    
    logout(callback) {
      this._transport.close(callback);
    }

  }


  class _Transport {

    constructor(ws, closeCallback) {
      this._ws = ws;
      this._counter = 0;
      this._callbacks = {};
      this._closeCallback = closeCallback;
      ws.onmessage = evt => {
        this._handle(evt.data);
      }
      ws.onclose = evt => {
        this._closeCallback(evt.code);
      }
    }

    write(req, callback) {
      const state = this._ws.readyState;
      if (state !== 1) {
        const reqStr = JSON.stringify(req);
        callback(
          `cannot send request ${reqStr}: connection state ${state} is not open`);
        return;
      }
      this._counter += 1;
      req['request-id'] = this._counter;
      this._callbacks[this._counter] = callback;
      this._ws.send(JSON.stringify(req));
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

    constructor(transport, loginResp) {
      this.transport = transport;
      const userInfo = loginResp['user-info'];
      this.info = {
        controllerAccess: userInfo['controller-access'],
        modelAccess: userInfo['model-access']
        // TODO: add the others.
      };
      const facades = loginResp.facades || [];
      this.facades = facades.reduce((previous, current) => {
        const versions = jujulib._facades[current.name];
        if (versions) {
          for (let i = current.versions.length-1; i >= 0; i--) {
            const version = current.versions[i];
            const facadeClass = versions[version];
            if (facadeClass) {
              previous[current.name] = facadeClass(this.transport, this.info);
              return previous;
            }
          }
        }
        return previous;
      }, {});
    }

  }

  jujulib.connect = connect;

}((module && module.exports) ? module.exports : this));