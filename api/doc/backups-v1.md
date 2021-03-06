<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# Backups v1

API provides backup-specific API methods.
This API facade is available on model connections.

To include BackupsV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/backups-v1')]
});
```
Facade methods at then accessible at `conn.facades.backups`.

Go back to [index](index.md).

## Methods
- [create](#createargs-callback)
- [finishRestore](#finishRestorecallback)
- [info](#infoargs-callback)
- [list](#listargs-callback)
- [prepareRestore](#prepareRestorecallback)
- [restore](#restoreargs-callback)

## create(args, callback)
Create is the API method that requests juju to create a new backup of its
    state.  It returns the metadata for that backup.  NOTE(hml) this
    provides backwards compatibility for facade version 1.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  notes: string,
  keepCopy: bool,
  noDownload: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  id: string,
  checksum: string,
  checksumFormat: string,
  size: int,
  stored: time,
  started: time,
  finished: time,
  notes: string,
  model: string,
  machine: string,
  hostname: string,
  version: anything,
  series: string,
  caCert: string,
  caPrivateKey: string,
  filename: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## finishRestore(callback)
FinishRestore implements the server side of Backups.FinishRestore.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## info(args, callback)
Info provides the implementation of the API method.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  id: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  id: string,
  checksum: string,
  checksumFormat: string,
  size: int,
  stored: time,
  started: time,
  finished: time,
  notes: string,
  model: string,
  machine: string,
  hostname: string,
  version: anything,
  series: string,
  caCert: string,
  caPrivateKey: string,
  filename: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## list(args, callback)
List provides the implementation of the API method.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
<object>
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  list: []{
    id: string,
    checksum: string,
    checksumFormat: string,
    size: int,
    stored: time,
    started: time,
    finished: time,
    notes: string,
    model: string,
    machine: string,
    hostname: string,
    version: anything,
    series: string,
    caCert: string,
    caPrivateKey: string,
    filename: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## prepareRestore(callback)
PrepareRestore implements the server side of Backups.PrepareRestore.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## restore(args, callback)
Restore implements the server side of Backups.Restore.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  backupId: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.