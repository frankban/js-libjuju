<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# RelationUnitsWatcher v1

srvRelationUnitsWatcher defines the API wrapping a
  state.RelationUnitsWatcher. It notifies about units entering and leaving
  the scope of a RelationUnit, and changes to the settings of those units
  known to have entered.
This API facade is available on model connections.

To include RelationUnitsWatcherV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/relation-units-watcher-v1')]
});
```
Facade methods at then accessible at `conn.facades.relationUnitsWatcher`.

Go back to [index](index.md).

## Methods
- [next](#nextcallback)
- [stop](#stopcallback)

## next(callback)
Next returns when a change has occurred to an entity of the collection
    being watched since the most recent call to Next or the Watch call that
    created the srvRelationUnitsWatcher.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  watcherId: string,
  changes: {
    changed: map[string]{
      version: int
    },
    departed: []string
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
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## stop(callback)
Stop stops the watcher.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.