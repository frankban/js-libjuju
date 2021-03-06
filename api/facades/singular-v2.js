/**
  Juju Singular version 2.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
*/

'use strict';

const {autoBind, createAsyncHandler} = require('../transform.js');

/**
  Facade allows controller machines to request exclusive rights to administer
  some specific model or controller for a limited time.
*/
class SingularV2 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 2;

    // Automatically bind all methods to instances.
    autoBind(this);
  }

  /**
    Claim makes the supplied singular-controller lease requests. (In practice,
    any requests not for the connection's model or controller, or not on
    behalf of the connected ModelManager machine, will be rejected.)

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          claims: []{
            entityTag: string,
            claimantTag: string,
            duration: int
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  claim(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#SingularClaims
      if (args) {
        params = {};
        params['claims'] = [];
        args.claims = args.claims || [];
        for (let i = 0; i < args.claims.length; i++) {
          // github.com/juju/juju/apiserver/params#SingularClaim
          if (args.claims[i]) {
            params['claims'][i] = {};
            params['claims'][i]['entity-tag'] = args.claims[i].entityTag;
            params['claims'][i]['claimant-tag'] = args.claims[i].claimantTag;
            // time#Duration
            params['claims'][i]['duration'] = args.claims[i].duration;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Singular',
        request: 'Claim',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
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

  /**
    Wait waits for the singular-controller lease to expire for all supplied
    entities. (In practice, any requests that do not refer to the
    connection's model or controller will be rejected.)

    @param {Object} args Arguments to be provided to Juju, as an object like
      the following:
        {
          entities: []{
            tag: string
          }
        }
    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          results: []{
            error: {
              message: string,
              code: string,
              info: {
                macaroon: anything,
                macaroonPath: string
              }
            }
          }
        }
    @return {Promise} Rejected or resolved with the values normally passed to
      the callback when the callback is not provided.
      This allows this method to be awaited.
  */
  wait(args, callback) {
    return new Promise((resolve, reject) => {
      // Prepare request parameters.
      let params;
      // github.com/juju/juju/apiserver/params#Entities
      if (args) {
        params = {};
        params['entities'] = [];
        args.entities = args.entities || [];
        for (let i = 0; i < args.entities.length; i++) {
          // github.com/juju/juju/apiserver/params#Entity
          if (args.entities[i]) {
            params['entities'][i] = {};
            params['entities'][i]['tag'] = args.entities[i].tag;
          }
        }
      }
      // Prepare the request to the Juju API.
      const req = {
        type: 'Singular',
        request: 'Wait',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#ErrorResults
        if (resp) {
          result = {};
          result.results = [];
          resp['results'] = resp['results'] || [];
          for (let i = 0; i < resp['results'].length; i++) {
            // github.com/juju/juju/apiserver/params#ErrorResult
            if (resp['results'][i]) {
              result.results[i] = {};
              // github.com/juju/juju/apiserver/params#Error
              if (resp['results'][i]['error']) {
                result.results[i].error = {};
                result.results[i].error.message = resp['results'][i]['error']['message'];
                result.results[i].error.code = resp['results'][i]['error']['code'];
                // github.com/juju/juju/apiserver/params#ErrorInfo
                if (resp['results'][i]['error']['info']) {
                  result.results[i].error.info = {};
                  // gopkg.in/macaroon.v2-unstable#Macaroon
                  result.results[i].error.info.macaroon = resp['results'][i]['error']['info']['macaroon'];
                  result.results[i].error.info.macaroonPath = resp['results'][i]['error']['info']['macaroon-path'];
                }
              }
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
if (wrappers.wrapSingular) {
  // Decorate the facade class in order to improve user experience.
  SingularV2 = wrappers.wrapSingular(SingularV2);
}

module.exports = SingularV2;