// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

const WebSocket = require('websocket').w3cwebsocket;
const bakery = require('macaroon-bakery');
// Bakery uses btoa and MLHttpRequest.
global.btoa = require('btoa');
global.XMLHttpRequest = require('xhr2');
const https = require('https');
const opn = require('opn');



const jujulib = require('../api/client.js');


const controllerFacades = [require('../api/facades/model-manager-v4.js')];
const modelFacades = [
  require('../api/facades/application-v5.js'),
  require('../api/facades/application-v6.js'),
  require('../api/facades/client-v1.js'),
  require('../api/facades/client-v2.js')
];
const macaroons = JSON.parse('[[{"identifier":"api-login","signature":"f69611e1f734c3f7dc523bf41c78566000813be87d146a804354073e86ec0ac9","location":"juju model 8a710bfe-9660-47ef-8054-338857fd0ced","caveats":[{"cid":"time-before 2018-07-17T20:18:13.95336126Z"},{"cid":"eyJUaGlyZFBhcnR5UHVibGljS2V5IjoiaG1IYVBnQ0MxVWZ1aFlIVVNYNSthaWhTQVplc3FwVmRqUnYwbWdmSXdqbz0iLCJGaXJzdFBhcnR5UHVibGljS2V5IjoiWWhYS2EyMzN0VUIyRUpQZC9nYU1BUy8vYk5TUWhOVlloQUNSakcrRmlDND0iLCJOb25jZSI6IkFqUnpBdDIrL2N3N3hHekg5Z2ZNbzdZUCtlZ3pNNW9pIiwiSWQiOiJ0aGVhTW51cTE3VDVVaDdURHJibnpTeEhIR2NneHdOcnhRamZlZWlhUGpXdkJMVTFvOTY1ZzlYbWR2ZzVtTHVaeTFUL0VCSFJQYkhYc1ZNaGhKc0pHZW1aOEprcUxWcmdxZFNJTkFGY2VQMzNaSlpnMitGSU4vYmUrb2RzeURUcFZydjEyd1RXUWFwVWlLb1h1Vk9BN2wrczBDc1JPK2VNTVE9PSJ9","vid":"JbuOiEaa9hqHgJhHQx76Wb2ThRKwlQGLXXhXuyjDBX4R7o2QjMpKUFDL_zSUEheHs4o5ZxR_rlBQir8Wi0XPCx2WQ0zCJOXY","cl":"https://api.jujucharms.com/identity"}]},{"identifier":"eyJUaGlyZFBhcnR5UHVibGljS2V5IjoiaG1IYVBnQ0MxVWZ1aFlIVVNYNSthaWhTQVplc3FwVmRqUnYwbWdmSXdqbz0iLCJGaXJzdFBhcnR5UHVibGljS2V5IjoiWWhYS2EyMzN0VUIyRUpQZC9nYU1BUy8vYk5TUWhOVlloQUNSakcrRmlDND0iLCJOb25jZSI6IkFqUnpBdDIrL2N3N3hHekg5Z2ZNbzdZUCtlZ3pNNW9pIiwiSWQiOiJ0aGVhTW51cTE3VDVVaDdURHJibnpTeEhIR2NneHdOcnhRamZlZWlhUGpXdkJMVTFvOTY1ZzlYbWR2ZzVtTHVaeTFUL0VCSFJQYkhYc1ZNaGhKc0pHZW1aOEprcUxWcmdxZFNJTkFGY2VQMzNaSlpnMitGSU4vYmUrb2RzeURUcFZydjEyd1RXUWFwVWlLb1h1Vk9BN2wrczBDc1JPK2VNTVE9PSJ9","signature":"6410a889958cee9c65a9c83ec32ebefb62d927a83173faa3926b912ff941b09e","caveats":[{"cid":"declared username frankban"},{"cid":"time-before 2018-07-18T19:18:17.297219241Z"}]}]]');

// Connect to a juju model or controller and then call the callback with an
// error and the connection.
function connect(url, facades, callback) {
  const options = {
    debug: true,
    facades: facades,
    wsclass: WebSocket,
    bakery: new bakery.Bakery({
      visitPage: resp => {
        opn(resp.Info.VisitURL, console.log);
      }
    })
  };
  jujulib.connect(url, options, (err, juju) => {
    if (err) {
      callback(`cannot connect to ${url}: ${err}`, null);
      return;
    }
    juju.login({macaroons: macaroons}, (err, conn) => {
      if (!err) {
        callback(null, conn);
        return;
      }
      if (!juju.isRedirectionError(err)) {
        callback(`cannot login to ${url}: ${err}`, null);
        return;
      }
      juju.logout();
      for (let i = 0; i < err.servers.length; i++) {
        const srv = err.servers[i];
        if (srv.type === 'hostname' && srv.scope === 'public') {
          const uuid = uuidFromURL(url);
          connect(srv.url(uuid), facades, callback);
          return;
        }
      }
      callback('cannot find a valid URL for connecting to the model', null);
    });
  });
}


function uuidFromURL(url) {
  const parts = url.split('/');
  return parts[parts.length-2];
}


class WaitGroup {
  constructor(callback) {
    this._callback = callback;
    this._num = 0;
  }
  add(num) {
    this._num += num;
  }
  done() {
    this._num--;
    if (this._num === 0) {
      this._callback();
    }
  }
}


function process(processors, callback) {
  connect('wss://jimm.jujucharms.com/api', controllerFacades, (err, conn) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    const modelManager = conn.facades.modelManager;

    // List models.
    modelManager.listModelSummaries({
      userTag: conn.info.identity, all: true
    }, (err, result) => {
      if (err) {
        console.log('cannot list models:', err);
        process.exit(1);
      }
      const data = [];
      const wg = new WaitGroup(() => callback(data));

      result.results.forEach(result => {
        if (result.error.message) {
          console.log('cannot get model info:', result.error.message);
          return;
        }
        wg.add(processors.length);
        const model = result.result;
        const modelData = {};
        data.push(modelData);
        const done = processedData => {
          Object.assign(modelData, processedData);
          wg.done();
        }

        // Connect to the model.
        const url = `wss://jimm.jujucharms.com/model/${model.uuid}/api`;
        connect(url, modelFacades, (err, conn) => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          processors.forEach(func => {
            func(model, conn, done);
          });
        })
      });
    });
  });
}


function addName(model, conn, done) {
  done({name: model.name});
}


function checkStatus(model, conn, done) {
  done({error: model.status.status !== 'available' || model.life !== 'alive'});
}


function checkShellStatus(model, conn, done) {
  if (model.name !== 'jujugui-shell') {
    done({});
    return;
  }
  conn.facades.application.get({application: 'jujushell-prod'}, (err, result) => {
    const dnsName = result.config['dns-name'].value;
    https.get(`https://${dnsName}/status/`, resp => {
      done({shellStatus: resp.statusCode});
    });
  });
}


process([addName, checkStatus, checkShellStatus], data => {
  console.log(data);
});

