<!---
NOTE: this file has been generated by the doc command in js-libjuju
on Tue 2018/11/27 16:23:14 UTC. Do not manually edit this file.
--->
# Client v1

ClientV1 serves the (v1) client-specific API methods.
This API facade is available on model connections.

To include ClientV1 capabilities in your client, load it as
part of your facades, for instance:
```javascript
const {conn, logout} = await jujulib.connectAndLogin(url, credentials, {
  facades: [require('jujulib/api/facades/client-v1')]
});
```
Facade methods at then accessible at `conn.facades.client`.

Go back to [index](index.md).

## Methods
- [addMachine](#addMachineargs-callback) (helper / overridden)
- [watch](#watchcallback) (helper / overridden)
- [apiHostPorts](#apiHostPortscallback)
- [abortCurrentUpgrade](#abortCurrentUpgradecallback)
- [addCharm](#addCharmargs-callback)
- [addCharmWithAuthorization](#addCharmWithAuthorizationargs-callback)
- [addMachines](#addMachinesargs-callback)
- [addMachinesV2](#addMachinesV2args-callback)
- [agentVersion](#agentVersioncallback)
- [caCert](#caCertcallback)
- [destroyMachines](#destroyMachinesargs-callback)
- [findTools](#findToolsargs-callback)
- [fullStatus](#fullStatusargs-callback)
- [getBundleChanges](#getBundleChangesargs-callback)
- [getModelConstraints](#getModelConstraintscallback)
- [injectMachines](#injectMachinesargs-callback)
- [modelGet](#modelGetcallback)
- [modelInfo](#modelInfocallback)
- [modelSet](#modelSetargs-callback)
- [modelUnset](#modelUnsetargs-callback)
- [modelUserInfo](#modelUserInfocallback)
- [privateAddress](#privateAddressargs-callback)
- [provisioningScript](#provisioningScriptargs-callback)
- [publicAddress](#publicAddressargs-callback)
- [resolveCharms](#resolveCharmsargs-callback)
- [resolved](#resolvedargs-callback)
- [retryProvisioning](#retryProvisioningargs-callback)
- [slaLevel](#slaLevelcallback)
- [setModelAgentVersion](#setModelAgentVersionargs-callback)
- [setModelConstraints](#setModelConstraintsargs-callback)
- [setSLALevel](#setSLALevelargs-callback)
- [statusHistory](#statusHistoryargs-callback)
- [watchAll](#watchAllcallback)

## addMachine(args, callback)

Add a new machine to the model.

- *@param {Object} args* Arguments fot creating a machine, like the following:
```javascript
{
  series: string,
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
  jobs: []string,
  disks: []{
    pool: string,
    size: int,
    count: int
  },
  placement: {
    scope: string,
    directive: string
  },
  parentId: string,
  containerType: string,
  instanceId: string,
  nonce: string,
  hardwareCharacteristics: {
    arch: string,
    mem: int,
    rootDisk: int,
    cpuCores: int,
    cpuPower: int,
    tags: []string,
    availabilityZone: string
  },
  addresses: []{
    value: string,
    type: string,
    scope: string,
    spaceName: string
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors,
  the result is provided as an object like the following:
```javascript
{
  machine: string,
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
- *@return {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.


## watch(callback)

Watch changes in the current model, and call the provided callback every
time changes arrive.

This method requires the AllWatcher facade to be loaded and available to the
client.

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


## apiHostPorts(callback)
APIHostPorts returns the API host/port addresses stored in state.

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

## abortCurrentUpgrade(callback)
AbortCurrentUpgrade aborts and archives the current upgrade synchronisation
    record, if any.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## addCharm(args, callback)
There is no documentation for this method.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  url: string,
  channel: string,
  force: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## addCharmWithAuthorization(args, callback)
AddCharmWithAuthorization adds the given charm URL (which must include
    revision) to the model, if it does not exist yet. Local charms are not
    supported, only charm store URLs. See also AddLocalCharm().  The
    authorization macaroon, args.CharmStoreMacaroon, may be omitted, in
    which case this call is equivalent to AddCharm.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  url: string,
  channel: string,
  macaroon: anything,
  force: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## addMachines(args, callback)
AddMachines adds new machines with the supplied parameters.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  params: []{
    series: string,
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
    jobs: []string,
    disks: []{
      pool: string,
      size: int,
      count: int
    },
    placement: {
      scope: string,
      directive: string
    },
    parentId: string,
    containerType: string,
    instanceId: string,
    nonce: string,
    hardwareCharacteristics: {
      arch: string,
      mem: int,
      rootDisk: int,
      cpuCores: int,
      cpuPower: int,
      tags: []string,
      availabilityZone: string
    },
    addresses: []{
      value: string,
      type: string,
      scope: string,
      spaceName: string
    }
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  machines: []{
    machine: string,
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

## addMachinesV2(args, callback)
AddMachinesV2 adds new machines with the supplied parameters.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  params: []{
    series: string,
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
    jobs: []string,
    disks: []{
      pool: string,
      size: int,
      count: int
    },
    placement: {
      scope: string,
      directive: string
    },
    parentId: string,
    containerType: string,
    instanceId: string,
    nonce: string,
    hardwareCharacteristics: {
      arch: string,
      mem: int,
      rootDisk: int,
      cpuCores: int,
      cpuPower: int,
      tags: []string,
      availabilityZone: string
    },
    addresses: []{
      value: string,
      type: string,
      scope: string,
      spaceName: string
    }
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  machines: []{
    machine: string,
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

## agentVersion(callback)
AgentVersion returns the current version that the API server is running.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  version: anything
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## caCert(callback)
CACert returns the certificate used to validate the state connection.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  result: []int
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## destroyMachines(args, callback)
DestroyMachines removes a given set of machines.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  machineNames: []string,
  force: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## findTools(args, callback)
FindTools returns a List containing all tools matching the given
    parameters.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  number: anything,
  major: int,
  minor: int,
  arch: string,
  series: string,
  agentstream: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  list: []{
    version: anything,
    url: string,
    sha256: string,
    size: int
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

## fullStatus(args, callback)
FullStatus gives the information needed for juju status over the api

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  patterns: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  model: {
    name: string,
    type: string,
    cloudTag: string,
    region: string,
    version: string,
    availableVersion: string,
    modelStatus: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    },
    meterStatus: {
      color: string,
      message: string
    },
    sla: string
  },
  machines: map[string]{
    agentStatus: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    },
    instanceStatus: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    },
    dnsName: string,
    ipAddresses: []string,
    instanceId: string,
    series: string,
    id: string,
    networkInterfaces: map[string]{
      ipAddresses: []string,
      macAddress: string,
      gateway: string,
      dnsNameservers: []string,
      space: string,
      isUp: bool
    },
    containers: map[string]<github.com/juju/juju/apiserver/params#machinestatus again>,
    constraints: string,
    hardware: string,
    jobs: []string,
    hasVote: bool,
    wantsVote: bool,
    lxdProfiles: map[string]{
      config: map[string]string,
      description: string,
      devices: map[string]map[string]string
    }
  },
  applications: map[string]{
    err: anything,
    charm: string,
    series: string,
    exposed: bool,
    life: string,
    relations: map[string][]string,
    canUpgradeTo: string,
    subordinateTo: []string,
    units: map[string]{
      agentStatus: {
        status: string,
        info: string,
        data: map[string]anything,
        since: time,
        kind: string,
        version: string,
        life: string,
        err: anything
      },
      workloadStatus: {
        status: string,
        info: string,
        data: map[string]anything,
        since: time,
        kind: string,
        version: string,
        life: string,
        err: anything
      },
      workloadVersion: string,
      machine: string,
      openedPorts: []string,
      publicAddress: string,
      charm: string,
      subordinates: map[string]<github.com/juju/juju/apiserver/params#unitstatus again>,
      leader: bool,
      providerId: string,
      address: string
    },
    meterStatuses: map[string]{
      color: string,
      message: string
    },
    status: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    },
    workloadVersion: string,
    charmVerion: string,
    endpointBindings: map[string]string,
    int: int,
    string: string,
    providerId: string,
    publicAddress: string
  },
  remoteApplications: map[string]{
    err: anything,
    offerUrl: string,
    offerName: string,
    endpoints: []{
      name: string,
      role: string,
      interface: string,
      limit: int
    },
    life: string,
    relations: map[string][]string,
    status: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    }
  },
  offers: map[string]{
    err: anything,
    offerName: string,
    applicationName: string,
    charm: string,
    endpoints: map[string]{
      name: string,
      role: string,
      interface: string,
      limit: int
    },
    activeConnectedCount: int,
    totalConnectedCount: int
  },
  relations: []{
    id: int,
    key: string,
    interface: string,
    scope: string,
    endpoints: []{
      application: string,
      name: string,
      role: string,
      subordinate: bool
    },
    status: {
      status: string,
      info: string,
      data: map[string]anything,
      since: time,
      kind: string,
      version: string,
      life: string,
      err: anything
    }
  },
  controllerTimestamp: time
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## getBundleChanges(args, callback)
GetBundleChanges returns the list of changes required to deploy the given
    bundle data. The changes are sorted by requirements, so that they can
    be applied in order. This call is deprecated, clients should use the
    GetChanges endpoint on the Bundle facade. Note: any new feature in the
    future like devices will never be supported here.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  yaml: string,
  bundleurl: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  changes: []{
    id: string,
    method: string,
    args: []anything,
    requires: []string
  },
  errors: []string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## getModelConstraints(callback)
GetModelConstraints returns the constraints for the model.

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

## injectMachines(args, callback)
InjectMachines injects a machine into state with provisioned status.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  params: []{
    series: string,
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
    jobs: []string,
    disks: []{
      pool: string,
      size: int,
      count: int
    },
    placement: {
      scope: string,
      directive: string
    },
    parentId: string,
    containerType: string,
    instanceId: string,
    nonce: string,
    hardwareCharacteristics: {
      arch: string,
      mem: int,
      rootDisk: int,
      cpuCores: int,
      cpuPower: int,
      tags: []string,
      availabilityZone: string
    },
    addresses: []{
      value: string,
      type: string,
      scope: string,
      spaceName: string
    }
  }
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  machines: []{
    machine: string,
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

## modelGet(callback)
ModelGet implements the server-side part of the model-config CLI command.

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

## modelInfo(callback)
ModelInfo returns information about the current model.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  name: string,
  type: string,
  uuid: string,
  controllerUuid: string,
  providerType: string,
  defaultSeries: string,
  cloudTag: string,
  cloudRegion: string,
  cloudCredentialTag: string,
  ownerTag: string,
  life: string,
  status: {
    status: string,
    info: string,
    data: map[string]anything,
    since: time
  },
  users: []{
    user: string,
    displayName: string,
    lastConnection: time,
    access: string
  },
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
  migration: {
    status: string,
    start: time,
    end: time
  },
  sla: {
    level: string,
    owner: string
  },
  agentVersion: anything
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelSet(args, callback)
ModelSet implements the server-side part of the set-model-config CLI
    command.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  config: map[string]anything
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelUnset(args, callback)
ModelUnset implements the server-side part of the set-model-config CLI
    command.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  keys: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## modelUserInfo(callback)
ModelUserInfo returns information on all users in the model.

- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  results: []{
    result: {
      user: string,
      displayName: string,
      lastConnection: time,
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

## privateAddress(args, callback)
PrivateAddress implements the server side of Client.PrivateAddress.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  target: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  privateAddress: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## provisioningScript(args, callback)
ProvisioningScript returns a shell script that, when run, provisions a
    machine agent on the machine executing the script.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  machineId: string,
  nonce: string,
  dataDir: string,
  disablePackageCommands: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  script: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## publicAddress(args, callback)
PublicAddress implements the server side of Client.PublicAddress.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  target: string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  publicAddress: string
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## resolveCharms(args, callback)
ResolveCharm resolves the best available charm URLs with series, for charm
    locations without a series specified.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  references: []string
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error and the result. If there are no errors, the
  result is provided as an object like the following:
```javascript
{
  urls: []{
    url: string,
    error: string
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## resolved(args, callback)
Resolved implements the server side of Client.Resolved.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  unitName: string,
  retry: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## retryProvisioning(args, callback)
RetryProvisioning marks a provisioning error as transient on the machines.

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
    }
  }
}
```
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## slaLevel(callback)
SLALevel returns the current sla level for the model.

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

## setModelAgentVersion(args, callback)
SetModelAgentVersion sets the model agent version.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  version: anything,
  force: bool
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## setModelConstraints(args, callback)
SetModelConstraints sets the constraints for the model.

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

## setSLALevel(args, callback)
SetSLALevel sets the sla level on the model.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  modelslainfo: {
    level: string,
    owner: string
  },
  creds: []int
}
```
- *@param {Function} callback* Called when the response from Juju is available,
  the callback receives an error or null if the operation succeeded.
- *@returns {Promise}* Rejected or resolved with the values normally passed to
  the callback when the callback is not provided.
  This allows this method to be awaited.

## statusHistory(args, callback)
StatusHistory returns a slice of past statuses for several entities.

- *@param {Object} args* Arguments to be provided to Juju, as an object like
  the following:
```javascript
{
  requests: []{
    historykind: string,
    size: int,
    filter: {
      size: int,
      date: time,
      delta: int,
      exclude: []string
    },
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
    history: {
      statuses: []{
        status: string,
        info: string,
        data: map[string]anything,
        since: time,
        kind: string,
        version: string,
        life: string,
        err: anything
      },
      error: {
        message: string,
        code: string,
        info: {
          macaroon: anything,
          macaroonPath: string
        }
      }
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

## watchAll(callback)
WatchAll initiates a watcher for entities in the connected model.

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