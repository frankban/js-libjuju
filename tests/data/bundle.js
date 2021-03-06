/**
  Juju Bundle version 1.
  This API facade is available on both controller and model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Wed 2042/01/01 16:42:47 UTC. Do not manually edit this file.
*/

'use strict';

const {autoBind, createAsyncHandler} = require('../transform.js');

/**
  Bundle defines the API endpoint used for changes.
*/
class BundleV1 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 1;

    // Automatically bind all methods to instances.
    autoBind(this);
  }

  /**
    GetChanges returns the list of changes required to deploy the given bundle
    data.

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          yaml: string
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          changes: []{
            id: string,
            method: string,
            args: []anything,
            requires: []string
          },
          errors: []string
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  getChanges(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#BundleChangesParams
      if (args) {
        params = {};
        params['yaml'] = args.yaml;
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Bundle',
        request: 'GetChanges',
        version: 1,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#BundleChangesResults
        if (resp) {
          result = {};
          result.changes = [];
          resp['changes'] = resp['changes'] || [];
          for (let i = 0; i < resp['changes'].length; i++) {
            // github.com/juju/juju/apiserver/params#BundleChange
            if (resp['changes'][i]) {
              result.changes[i] = {};
              result.changes[i].id = resp['changes'][i]['id'];
              result.changes[i].method = resp['changes'][i]['method'];
              result.changes[i].args = [];
              resp['changes'][i]['args'] = resp['changes'][i]['args'] || [];
              for (let i2 = 0; i2 < resp['changes'][i]['args'].length; i2++) {
                result.changes[i].args[i2] = resp['changes'][i]['args'][i2];
              }
              result.changes[i].requires = [];
              resp['changes'][i]['requires'] = resp['changes'][i]['requires'] || [];
              for (let i2 = 0; i2 < resp['changes'][i]['requires'].length; i2++) {
                result.changes[i].requires[i2] = resp['changes'][i]['requires'][i2];
              }
            }
          }
          result.errors = [];
          resp['errors'] = resp['errors'] || [];
          for (let i = 0; i < resp['errors'].length; i++) {
            result.errors[i] = resp['errors'][i];
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
if (wrappers.wrapBundle) {
  // Decorate the facade class in order to improve user experience.
  BundleV1 = wrappers.wrapBundle(BundleV1);
}

module.exports = BundleV1;
