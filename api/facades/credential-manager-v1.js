/**
  Juju CredentialManager version 1.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
*/

'use strict';

const {autoBind, createAsyncHandler} = require('../transform.js');

/**
  There is no documentation for this facade.
*/
class CredentialManagerV1 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 1;

    // Automatically bind all methods to instances.
    autoBind(this);
  }

  /**
    InvalidateModelCredential marks the cloud credential for this model as
    invalid.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          reason: string
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          error: {
            message: string,
            code: string,
            info: {
              macaroon: anything,
              macaroonPath: string
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  invalidateModelCredential(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#InvalidateCredentialArg
      if (args) {
        params = {};
        params['reason'] = args.reason;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'CredentialManager',
        request: 'InvalidateModelCredential',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResult
        if (resp) {
          result = {};
          // github.com/juju/juju/apiserver/params#Error
          if (resp['error']) {
            result.error = {};
            result.error.message = resp['error']['message'];
            result.error.code = resp['error']['code'];
            // github.com/juju/juju/apiserver/params#ErrorInfo
            if (resp['error']['info']) {
              result.error.info = {};
              // gopkg.in/macaroon.v2-unstable#Macaroon
              result.error.info.macaroon = resp['error']['info']['macaroon'];
              result.error.info.macaroonPath = resp['error']['info']['macaroon-path'];
            }
          }
        }
        return result;
      };

      const handler = createAsyncHandler(callback, resolve, reject, transform);
      // Send the request to the server.
      this._transport.write(req, handler);
    });
  }
}


const wrappers = require('../wrappers.js');
if (wrappers.wrapCredentialManager) {
  // Decorate the facade class in order to improve user experience.
  CredentialManagerV1 = wrappers.wrapCredentialManager(CredentialManagerV1);
}

module.exports = CredentialManagerV1;