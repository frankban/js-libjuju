/**
  Juju VolumeAttachmentsWatcher version 2.
  This API facade is available on model connections.

  NOTE: this file has been generated by the generate command in js-libjuju
  on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
*/

'use strict';

const {autoBind, createAsyncHandler} = require('../transform.js');

/**
  srvMachineStorageIdsWatcher defines the API wrapping a state.StringsWatcher
  watching machine/storage attachments. This watcher notifies about storage
  entities (volumes/filesystems) being attached to and detached from
  machines.  TODO(axw) state needs a new watcher, this is a bt of a hack.
  State watchers could do with some deduplication of logic, and I don't want
  to add to that spaghetti right now.
*/
class VolumeAttachmentsWatcherV2 {

  constructor(transport, info) {
    this._transport = transport;
    this._info = info;
    this.version = 2;

    // Automatically bind all methods to instances.
    autoBind(this);
  }

  /**
    Next returns when a change has occurred to an entity of the collection
    being watched since the most recent call to Next or the Watch call that
    created the srvMachineStorageIdsWatcher.

    @param {Function} callback Called when the response from Juju is available,
      the callback receives an error and the result. If there are no errors,
      the result is provided as an object like the following:
        {
          watcherId: string,
          changes: []{
            machineTag: string,
            attachmentTag: string
          },
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
  next(callback) {
    return new Promise((resolve, reject) => {
      const params = {};
      // Prepare the request to the Juju API.
      const req = {
        type: 'VolumeAttachmentsWatcher',
        request: 'Next',
        version: 2,
        params: params
      };
      // Define a transform method if necessary.
      let transform = null;
      transform = resp => {
        let result;
        // github.com/juju/juju/apiserver/params#MachineStorageIdsWatchResult
        if (resp) {
          result = {};
          result.watcherId = resp['watcher-id'];
          result.changes = [];
          resp['changes'] = resp['changes'] || [];
          for (let i = 0; i < resp['changes'].length; i++) {
            // github.com/juju/juju/apiserver/params#MachineStorageId
            if (resp['changes'][i]) {
              result.changes[i] = {};
              result.changes[i].machineTag = resp['changes'][i]['machine-tag'];
              result.changes[i].attachmentTag = resp['changes'][i]['attachment-tag'];
            }
          }
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

  /**
    Stop stops the watcher.

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
        type: 'VolumeAttachmentsWatcher',
        request: 'Stop',
        version: 2,
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
if (wrappers.wrapVolumeAttachmentsWatcher) {
  // Decorate the facade class in order to improve user experience.
  VolumeAttachmentsWatcherV2 = wrappers.wrapVolumeAttachmentsWatcher(VolumeAttachmentsWatcherV2);
}

module.exports = VolumeAttachmentsWatcherV2;