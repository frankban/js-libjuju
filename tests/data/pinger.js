/**
  Juju Pinger version 42.
  This API facade is available on both controller and model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Wed 2042/01/01 16:42:47 UTC. Do not manually edit this file.
*/

'use strict';

const {autoBind, createAsyncHandler} = require('../transform.js');

/**
  pinger describes a resource that can be pinged.
*/
class PingerV42 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 42;

    // Automatically bind all methods to instances.
    autoBind(this);
  }

  /**
    There is no documentation for this method.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  ping(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Pinger',
        request: 'Ping',
        version: 42,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }

  /**
    Stop the pinger

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error or null if the operation succeeded.
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  stop(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'Pinger',
        request: 'Stop',
        version: 42,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapPinger) {
  // Decorate the facade class in order to improve user experience.
  PingerV42 = wrappers.wrapPinger(PingerV42);
}

module.exports = PingerV42;
