<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# Subnets v2

SubnetsAPI defines the methods the Subnets API facade implements.
This API facade is available on model connections.

To include SubnetsV2 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/subnets-v2')]
});
```
Facade methods at then accessible at `conn.facades.subnets`.

Go back to [index](index.md).

## Methods
- [addSubnets](#addSubnetsargs-callback)
- [allSpaces](#allSpacescallback)
- [allZones](#allZonescallback)
- [listSubnets](#listSubnetsargs-callback)

## addSubnets(args, callback)
AddSubnets adds existing subnets to Juju.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  subnets: []{
    subnetTag: string,
    subnetProviderId: string,
    providerNetworkId: string,
    spaceTag: string,
    vlanTag: int,
    zones: []string
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

## allSpaces(callback)
AllSpaces returns the tags of all network spaces known to Juju.

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
    },
    tag: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## allZones(callback)
AllZones returns all availability zones known to Juju. If a zone is
    unusable, unavailable, or deprecated the Available field will be false.

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
    },
    name: string,
    available: bool
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## listSubnets(args, callback)
ListSubnets returns the matching subnets after applying optional filters.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  spaceTag: string,
  zone: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    cidr: string,
    providerId: string,
    providerNetworkId: string,
    providerSpaceId: string,
    vlanTag: int,
    life: string,
    spaceTag: string,
    zones: []string,
    status: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.