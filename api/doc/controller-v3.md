<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# Controller v3

ControllerAPIv3 provides the v3 Controller API.
This API facade is available on controller connections.

To include ControllerV3 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/controller-v3')]
});
```
Facade methods at then accessible at `conn.facades.controller`.

Go back to [index](index.md).

## Methods
- [watch](#watchcallback) (helper / overridden)
- [allModels](#allModelscallback)
- [cloudSpec](#cloudSpecargs-callback)
- [controllerAPIInfoForModels](#controllerAPIInfoForModelsargs-callback)
- [controllerConfig](#controllerConfigcallback)
- [destroyController](#destroyControllerargs-callback)
- [getCloudSpec](#getCloudSpecargs-callback)
- [getControllerAccess](#getControllerAccessargs-callback)
- [hostedModelConfigs](#hostedModelConfigscallback)
- [initiateMigration](#initiateMigrationargs-callback)
- [listBlockedModels](#listBlockedModelscallback)
- [modelConfig](#modelConfigcallback)
- [modelStatus](#modelStatusargs-callback)
- [modifyControllerAccess](#modifyControllerAccessargs-callback)
- [removeBlocks](#removeBlocksargs-callback)
- [watchAllModels](#watchAllModelscallback)

## watch(callback)

Watch changes in the all models on this controller, and call the provided
callback every time changes arrive.

This method requires the AllModelWatcher facade to be loaded and available
to the client.

- *@param {Function} callback* Called every time changes arrive from Juju, the
  callback receives an error and a the changes. If there are no errors,
  changes are provided as an object like the following:
```javascript
{
  deltas: []anything
}
```
- *@returns {Object}* A handle that can be used to stop watching, via its stop
  method which can be provided a callback receiving an error.


## allModels(callback)
AllModels allows controller administrators to get the list of all the
    models in the controller.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  userModels: []{
    model: {
      name: string,
      uuid: string,
      type: string,
      ownerTag: string
    },
    lastConnection: time
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## cloudSpec(args, callback)
CloudSpec returns the model's cloud spec.

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
    result: {
      type: string,
      name: string,
      region: string,
      endpoint: string,
      identityEndpoint: string,
      storageEndpoint: string,
      credential: {
        authType: string,
        attrs: map[string]string,
        redacted: []string
      },
      cacertificates: []string
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
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## controllerAPIInfoForModels(args, callback)
ControllerAPIInfoForModels returns the controller api connection details
    for the specified models.

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
    addresses: []string,
    cacert: string,
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

## controllerConfig(callback)
ControllerConfig returns the controller's configuration.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  config: map[string]anything
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyController(args, callback)
DestroyController destroys the controller.  The v3 implementation of
    DestroyController ignores the DestroyStorage field of the arguments,
    and unconditionally destroys all storage in the controller.  See
    ControllerAPIv4.DestroyController for more details.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  destroyModels: bool,
  destroyStorage: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## getCloudSpec(args, callback)
GetCloudSpec constructs the CloudSpec for a validated and authorized model.

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
  result: {
    type: string,
    name: string,
    region: string,
    endpoint: string,
    identityEndpoint: string,
    storageEndpoint: string,
    credential: {
      authType: string,
      attrs: map[string]string,
      redacted: []string
    },
    cacertificates: []string
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

## getControllerAccess(args, callback)
GetControllerAccess returns the level of access the specified users have on
    the controller.

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
    result: {
      userTag: string,
      access: string
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
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## hostedModelConfigs(callback)
HostedModelConfigs returns all the information that the client needs in
    order to connect directly with the host model's provider and destroy it
    directly.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  models: []{
    name: string,
    owner: string,
    config: map[string]anything,
    cloudSpec: {
      type: string,
      name: string,
      region: string,
      endpoint: string,
      identityEndpoint: string,
      storageEndpoint: string,
      credential: {
        authType: string,
        attrs: map[string]string,
        redacted: []string
      },
      cacertificates: []string
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
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## initiateMigration(args, callback)
InitiateMigration attempts to begin the migration of one or more models to
    other controllers.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  specs: []{
    modelTag: string,
    targetInfo: {
      controllerTag: string,
      addrs: []string,
      caCert: string,
      authTag: string,
      password: string,
      macaroons: string
    }
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    modelTag: string,
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    },
    migrationId: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## listBlockedModels(callback)
ListBlockedModels returns a list of all models on the controller which have
    a block in place.  The resulting slice is sorted by model name, then
    owner. Callers must be controller administrators to retrieve the list.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  models: []{
    name: string,
    modelUuid: string,
    ownerTag: string,
    blocks: []string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelConfig(callback)
ModelConfig returns the model config for the controller model.  For
    information on the current model, use client.ModelGet

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  config: map[string]{
    value: anything,
    source: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelStatus(args, callback)
ModelStatus is a legacy method call to ensure that we preserve backward
    compatibility. TODO (anastasiamac 2017-10-26) This should be made
    obsolete/removed.

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
  models: []{
    modelTag: string,
    life: string,
    hostedMachineCount: int,
    applicationCount: int,
    ownerTag: string,
    machines: []{
      id: string,
      hardware: {
        arch: string,
        mem: int,
        rootDisk: int,
        cores: int,
        cpuPower: int,
        tags: []string,
        availabilityZone: string
      },
      instanceId: string,
      status: string,
      hasVote: bool,
      wantsVote: bool
    },
    volumes: []{
      id: string,
      providerId: string,
      status: string,
      detachable: bool
    },
    filesystems: []{
      id: string,
      providerId: string,
      status: string,
      detachable: bool
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
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modifyControllerAccess(args, callback)
ModifyControllerAccess changes the model access granted to users.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  changes: []{
    userTag: string,
    action: string,
    access: string
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

## removeBlocks(args, callback)
RemoveBlocks removes all the blocks in the controller.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  all: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## watchAllModels(callback)
WatchAllModels starts watching events for all models in the controller. The
    returned AllWatcherId should be used with Next on the AllModelWatcher
    endpoint to receive deltas.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  watcherId: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.