<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# CAASOperatorProvisioner v1

There is no documentation for this facade.
This API facade is available on model connections.

To include CAASOperatorProvisionerV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/caas-operator-provisioner-v1')]
});
```
Facade methods at then accessible at `conn.facades.caasOperatorProvisioner`.

Go back to [index](index.md).

## Methods
- [apiAddresses](#apiAddressescallback)
- [apiHostPorts](#apiHostPortscallback)
- [life](#lifeargs-callback)
- [modelUUID](#modelUUIDcallback)
- [operatorProvisioningInfo](#operatorProvisioningInfocallback)
- [setPasswords](#setPasswordsargs-callback)
- [watchAPIHostPorts](#watchAPIHostPortscallback)
- [watchApplications](#watchApplicationscallback)

## apiAddresses(callback)
APIAddresses returns the list of addresses used to connect to the API.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  error: {
    message: string,
    code: string,
    info: {
      macaroon: anything,
      macaroonPath: string
    }
  },
  result: []string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## apiHostPorts(callback)
APIHostPorts returns the API server addresses.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  servers: [][]{
    address: {
      value: string,
      type: string,
      scope: string,
      spaceName: string
    },
    port: int
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## life(args, callback)
Life returns the life status of every supplied entity, where available.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  entities: []{
    tag: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    life: string,
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

## modelUUID(callback)
ModelUUID returns the model UUID to connect to the model that the current
    connection is for.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  error: {
    message: string,
    code: string,
    info: {
      macaroon: anything,
      macaroonPath: string
    }
  },
  result: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## operatorProvisioningInfo(callback)
OperatorProvisioningInfo returns the info needed to provision an operator.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  imagePath: string,
  version: anything,
  apiAddresses: []string,
  tags: map[string]string,
  charmStorage: {
    storagename: string,
    size: int,
    provider: string,
    attributes: map[string]anything,
    tags: map[string]string,
    attachment: {
      provider: string,
      mountPoint: string,
      readOnly: bool
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setPasswords(args, callback)
SetPasswords sets the given password for each supplied entity, if possible.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  changes: []{
    tag: string,
    password: string
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

## watchAPIHostPorts(callback)
WatchAPIHostPorts watches the API server addresses.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  notifywatcherid: string,
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

## watchApplications(callback)
WatchApplications starts a StringsWatcher to watch CAAS applications
    deployed to this model.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  watcherId: string,
  changes: []string,
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