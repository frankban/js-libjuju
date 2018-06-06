// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

'use strict';


function wrapAllWatcher(cls) {
  cls.prototype.next = function(watcherId, callback) {
    // Prepare the request to the Juju API.
    const req = {
      type: 'AllWatcher',
      request: 'Next',
      version: 1,
      id: watcherId
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (!callback) {
        return;
      }
      if (err) {
        callback(err, {});
        return;
      }
      // Handle the response.
      const result = {};
      resp = resp || {};
      result.deltas = [];
      resp['deltas'] = resp['deltas'] || [];
      for (let i = 0; i < resp['deltas'].length; i++) {
        result.deltas[i] = {};
        resp['deltas'][i] = resp['deltas'][i] || {};
        result.deltas[i].entity = {};
        resp['deltas'][i]['entity'] = resp['deltas'][i]['entity'] || {};
        result.deltas[i].removed = resp['deltas'][i]['removed'];
      }
      callback(null, result);
    });
  };
  cls.prototype.stop = function(watcherId, callback) {
    // Prepare the request to the Juju API.
    const req = {
      type: 'AllWatcher',
      request: 'Stop',
      version: 1,
      id: watcherId
    };
    // Send the request to the server.
    this._transport.write(req, (err, resp) => {
      if (!callback) {
        return;
      }
      if (err) {
        callback(err, {});
        return;
      }
      callback(null, {});
    });
  };
  return cls;
}



function wrapClient(cls) {
  cls.prototype.watch = function(callback) {
    if (!callback) {
      callback = () => {};
    }
    const allWatcher = this._info.getFacade('allWatcher');
    if (!allWatcher) {
      callback('watch requires the allWatcher facade to be loaded', {});
      return;
    }
    let watcherId;
    const next = callback => {
      if (!watcherId) {
        return;
      }
      allWatcher.next(watcherId, (err, result) => {
        callback(err, result);
        next(callback);
      });
    };
    this.watchAll((err, result) => {
      if (err) {
        callback(err, {});
        return;
      }
      watcherId = result.watcherId;
      next(callback);
    });
    return {
      stop: callback => {
        if (watcherId === undefined) {
          callback('watcher is not running', {});
          return;
        }
        allWatcher.stop(watcherId, callback);
        watcherId = undefined;
      }
    };
  };
  return cls;
}


function wrapPinger(cls) {
  cls.prototype.pingForever = function(interval, callback) {
    const timer = setInterval(() => {
      this.ping(err => {
        if (callback) {
          callback(err);
        }
      });
    }, interval);
    return {
      stop: function() {
        clearInterval(timer);
      }
    };
  };
  return cls;
}


module.exports = {
  wrapAllWatcher: wrapAllWatcher,
  wrapClient: wrapClient,
  wrapPinger: wrapPinger
};