<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:13 UTC. Do not manually edit this file.
--->
# Application v1

APIv4 provides the Application API facade for versions 1-4.
This API facade is available on model connections.

To include ApplicationV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/application-v1')]
});
```
Facade methods at then accessible at `conn.facades.application`.

Go back to [index](index.md).

## Methods
- [addCharmAndDeploy](#addCharmAndDeployargs-callback) (helper / overridden)
- [addRelation](#addRelationargs-callback)
- [addUnits](#addUnitsargs-callback)
- [charmRelations](#charmRelationsargs-callback)
- [consume](#consumeargs-callback)
- [deploy](#deployargs-callback)
- [destroy](#destroyargs-callback)
- [destroyApplication](#destroyApplicationargs-callback)
- [destroyConsumedApplications](#destroyConsumedApplicationsargs-callback)
- [destroyRelation](#destroyRelationargs-callback)
- [destroyUnit](#destroyUnitargs-callback)
- [destroyUnits](#destroyUnitsargs-callback)
- [expose](#exposeargs-callback)
- [get](#getargs-callback)
- [getCharmURL](#getCharmURLargs-callback)
- [getConstraints](#getConstraintsargs-callback)
- [getLXDProfileUpgradeMessages](#getLXDProfileUpgradeMessagesargs-callback)
- [set](#setargs-callback)
- [setCharm](#setCharmargs-callback)
- [setCharmProfile](#setCharmProfileargs-callback)
- [setConstraints](#setConstraintsargs-callback)
- [setMetricCredentials](#setMetricCredentialsargs-callback)
- [setRelationsSuspended](#setRelationsSuspendedargs-callback)
- [unexpose](#unexposeargs-callback)
- [unset](#unsetargs-callback)
- [update](#updateargs-callback)
- [watchLXDProfileUpgradeNotifications](#watchLXDProfileUpgradeNotificationsargs-callback)

## addCharmAndDeploy(args, callback)

Add a charm store charm to the model and then deploy the application.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  charmUrl: string,
  application: string,
  series: string,
  channel: string,
  numUnits: int,
  config: map[string]string,
  configYaml: string,
  constraints: {
    arch: string,
    container: string,
    cores: int,
    cpuPower: int,
    mem: int,
    rootDisk: int,
    tags: []string,
    instanceType: string,
    spaces: []string,
    virtType: string
  },
  placement: []{
    scope: string,
    directive: string
  },
  policy: string,
  storage: map[string]{
    pool: string,
    size: int,
    count: int
  },
  attachStorage: []string,
  endpointBindings: map[string]string,
  resources: map[string]string
}
```
  The charmUrl, application and series (for multi-series charm) arguments
  are required.
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no connection
  errors, the deployment result is provided as an object like:
```javascript
{
  error: {
    message: string,
    code: string,
  }
}
```
- *@return {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.


## addRelation(args, callback)
AddRelation adds a relation between the specified endpoints and returns the
    relation info.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  endpoints: []string,
  viaCidrs: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  endpoints: map[string]{
    name: string,
    role: string,
    interface: string,
    optional: bool,
    limit: int,
    scope: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## addUnits(args, callback)
AddUnits adds a given number of units to an application.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  numUnits: int,
  placement: []{
    scope: string,
    directive: string
  },
  attachStorage: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  units: []string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## charmRelations(args, callback)
CharmRelations implements the server side of Application.CharmRelations.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  charmRelations: []string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## consume(args, callback)
Consume adds remote applications to the model without creating any
    relations.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  args: []{
    applicationofferdetails: {
      sourceModelTag: string,
      offerUuid: string,
      offerUrl: string,
      offerName: string,
      applicationDescription: string,
      endpoints: []{
        name: string,
        role: string,
        interface: string,
        limit: int
      },
      spaces: []{
        cloudType: string,
        name: string,
        providerId: string,
        providerAttributes: map[string]anything,
        subnets: []{
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
      },
      bindings: map[string]string,
      users: []{
        user: string,
        displayName: string,
        access: string
      }
    },
    macaroon: anything,
    externalController: {
      controllerTag: string,
      controllerAlias: string,
      addrs: []string,
      caCert: string
    },
    applicationAlias: string
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

## deploy(args, callback)
Deploy fetches the charms from the charm store and deploys them using the
    specified placement directives. V5 deploy did not support policy, so
    pass through an empty string.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  applications: []{
    application: string,
    series: string,
    charmUrl: string,
    channel: string,
    numUnits: int,
    config: map[string]string,
    configYaml: string,
    constraints: {
      arch: string,
      container: string,
      cores: int,
      cpuPower: int,
      mem: int,
      rootDisk: int,
      tags: []string,
      instanceType: string,
      spaces: []string,
      virtType: string
    },
    placement: []{
      scope: string,
      directive: string
    },
    storage: map[string]{
      pool: string,
      size: int,
      count: int
    },
    attachStorage: []string,
    endpointBindings: map[string]string,
    resources: map[string]string
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

## destroy(args, callback)
Destroy destroys a given application, local or remote.  NOTE(axw) this
    exists only for backwards compatibility, for API facade versions 1-3;
    clients should prefer its successor, DestroyApplication, below. Until
    all consumers have been updated, or we bump a major version, we can't
    drop this.  TODO(axw) 2017-03-16 #1673323 Drop this in Juju 3.0.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyApplication(args, callback)
DestroyApplication removes a given set of applications.  NOTE(axw) this
    provides backwards compatibility for facade version 4.

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
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    },
    info: {
      detachedStorage: []{
        tag: string
      },
      destroyedStorage: []{
        tag: string
      },
      destroyedUnits: []{
        tag: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyConsumedApplications(args, callback)
DestroyConsumedApplications removes a given set of consumed (remote)
    applications.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  applications: []{
    applicationTag: string
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

## destroyRelation(args, callback)
DestroyRelation removes the relation between the specified endpoints or an
    id.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  endpoints: []string,
  relationId: int
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyUnit(args, callback)
DestroyUnit removes a given set of application units.  NOTE(axw) this
    provides backwards compatibility for facade version 4.

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
    error: {
      message: string,
      code: string,
      info: {
        macaroon: anything,
        macaroonPath: string
      }
    },
    info: {
      detachedStorage: []{
        tag: string
      },
      destroyedStorage: []{
        tag: string
      }
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyUnits(args, callback)
DestroyUnits removes a given set of application units.  NOTE(axw) this
    exists only for backwards compatibility, for API facade versions 1-3;
    clients should prefer its successor, DestroyUnit, below. Until all
    consumers have been updated, or we bump a major version, we can't drop
    this.  TODO(axw) 2017-03-16 #1673323 Drop this in Juju 3.0.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  unitNames: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## expose(args, callback)
Expose changes the juju-managed firewall to expose any ports that were also
    explicitly marked by units as open.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## get(args, callback)
Get returns the charm configuration for an application. This used the
    confusing "default" boolean to mean the value was set from the charm
    defaults. Needs to be kept for backwards compatibility.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  application: string,
  charm: string,
  config: map[string]anything,
  applicationConfig: map[string]anything,
  constraints: {
    arch: string,
    container: string,
    cores: int,
    cpuPower: int,
    mem: int,
    rootDisk: int,
    tags: []string,
    instanceType: string,
    spaces: []string,
    virtType: string
  },
  series: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## getCharmURL(args, callback)
GetCharmURL returns the charm URL the given application is running at
    present.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
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

## getConstraints(args, callback)
GetConstraints returns the v4 implementation of GetConstraints.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  constraints: {
    arch: string,
    container: string,
    cores: int,
    cpuPower: int,
    mem: int,
    rootDisk: int,
    tags: []string,
    instanceType: string,
    spaces: []string,
    virtType: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## getLXDProfileUpgradeMessages(args, callback)
GetLXDProfileUpgradeMessages returns the lxd profile messages associated
    with a application and set of machines

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: {
    tag: string
  },
  watcherId: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  args: []{
    unitName: string,
    message: string,
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

## set(args, callback)
Set implements the server side of Application.Set. It does not unset values
    that are set to an empty string. Unset should be used for that.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  options: map[string]string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setCharm(args, callback)
SetCharm sets the charm for a given for the application.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  charmUrl: string,
  channel: string,
  configSettings: map[string]string,
  configSettingsYaml: string,
  force: bool,
  forceUnits: bool,
  forceSeries: bool,
  resourceIds: map[string]string,
  storageConstraints: map[string]{
    pool: string,
    size: int,
    count: int
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setCharmProfile(args, callback)
SetCharmProfile a new charm's url on deployed machines for changing the
    profile used on those machine.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  charmUrl: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setConstraints(args, callback)
SetConstraints sets the constraints for a given application.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  constraints: {
    arch: string,
    container: string,
    cores: int,
    cpuPower: int,
    mem: int,
    rootDisk: int,
    tags: []string,
    instanceType: string,
    spaces: []string,
    virtType: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setMetricCredentials(args, callback)
SetMetricCredentials sets credentials on the application.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  creds: []{
    application: string,
    metricsCredentials: []int
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

## setRelationsSuspended(args, callback)
SetRelationsSuspended sets the suspended status of the specified relations.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  args: []{
    relationId: int,
    message: string,
    suspended: bool
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

## unexpose(args, callback)
Unexpose changes the juju-managed firewall to unexpose any ports that were
    also explicitly marked by units as open.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## unset(args, callback)
Unset implements the server side of Client.Unset.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  options: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## update(args, callback)
Update updates the application attributes, including charm URL, minimum
    number of units, charm config and constraints. All parameters in
    params.ApplicationUpdate except the application name are optional.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  application: string,
  charmUrl: string,
  forceCharmUrl: bool,
  forceSeries: bool,
  force: bool,
  minUnits: int,
  settings: map[string]string,
  settingsYaml: string,
  constraints: {
    arch: string,
    container: string,
    cores: int,
    cpuPower: int,
    mem: int,
    rootDisk: int,
    tags: []string,
    instanceType: string,
    spaces: []string,
    virtType: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## watchLXDProfileUpgradeNotifications(args, callback)
WatchLXDProfileUpgradeNotifications returns a watcher that fires on LXD
    profile events.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  tag: string
}
```
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