<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# HostKeyReporter v1

Facade implements the API required by the hostkeyreporter worker.
This API facade is available on model connections.

To include HostKeyReporterV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/host-key-reporter-v1')]
});
```
Facade methods at then accessible at `conn.facades.hostKeyReporter`.

Go back to [index](index.md).

## Methods
- [reportKeys](#reportKeysargs-callback)

## reportKeys(args, callback)
ReportKeys sets the SSH host keys for one or more entities.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entityKeys: []{
    tag: string,
    publicKeys: []string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
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
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.