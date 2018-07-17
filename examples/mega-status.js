// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

const WebSocket = require('websocket').w3cwebsocket;
const bakery = require('macaroon-bakery');
// Bakery uses btoa and MLHttpRequest.
global.btoa = require('btoa');
global.XMLHttpRequest = require('xhr2');
const opn = require('opn');


const jujulib = require('../api/client.js');


const controllerFacades = [require('../api/facades/model-manager-v4.js')];
const modelFacades = [
  require('../api/facades/application-v5.js'),
  require('../api/facades/application-v6.js'),
  require('../api/facades/client-v1.js'),
  require('../api/facades/client-v2.js')
];
const macaroons = JSON.parse(`[[{"identifier":"api-login","signature":"643789dcfc9f68331d5bcf15411e9d091c8793fb0ed50bd14e5b955644f6358c","location":"juju model 48c2cc6a-2464-4cb8-8b9e-31ff4b453c71","caveats":[{"cid":"time-before 2018-07-17T17:10:26.05716725Z"},{"cid":"eyJUaGlyZFBhcnR5UHVibGljS2V5IjoiaG1IYVBnQ0MxVWZ1aFlIVVNYNSthaWhTQVplc3FwVmRqUnYwbWdmSXdqbz0iLCJGaXJzdFBhcnR5UHVibGljS2V5IjoiVjI2ejJaSlZkYjA3cDJta0FmNmJtT0IrTUtvWWlSTUdPKzZtMVloeGJIaz0iLCJOb25jZSI6IkpHYTFZL1N2UTlLMlR1dTVoSHhpOStQMXlDU2EzNmxVIiwiSWQiOiJQd1R5Um1xUURHRlNHOFZuK0lVMFhwUXpuUHZMaTllNWo3Mk8raUVValhxSHduVWJ3dnk2MW9nRFBabW1iV3ViREluRGN6UlBzS2V0VnhCQ1NqNktZbnlzZjFCQU12R2V5TDNrdjlHZFBKMTlHSlY4ejU5U2pidEtGK1hTN1Y3QXF5YnNwS2gxZXIxUDN4Y3hMamEzY0l5ak9RUitMbHROQkE9PSJ9","vid":"X1-x55hl3vNBqbNZ1dSVNMkAl-UDwYS5qKpQ1A4ELtqcC6rsT1plj41PtYHgU5SG1veMFUknqQwU3qYnWX_QRfCUFNQSH1Ab","cl":"https://api.jujucharms.com/identity"}]},{"identifier":"eyJUaGlyZFBhcnR5UHVibGljS2V5IjoiaG1IYVBnQ0MxVWZ1aFlIVVNYNSthaWhTQVplc3FwVmRqUnYwbWdmSXdqbz0iLCJGaXJzdFBhcnR5UHVibGljS2V5IjoiVjI2ejJaSlZkYjA3cDJta0FmNmJtT0IrTUtvWWlSTUdPKzZtMVloeGJIaz0iLCJOb25jZSI6IkpHYTFZL1N2UTlLMlR1dTVoSHhpOStQMXlDU2EzNmxVIiwiSWQiOiJQd1R5Um1xUURHRlNHOFZuK0lVMFhwUXpuUHZMaTllNWo3Mk8raUVValhxSHduVWJ3dnk2MW9nRFBabW1iV3ViREluRGN6UlBzS2V0VnhCQ1NqNktZbnlzZjFCQU12R2V5TDNrdjlHZFBKMTlHSlY4ejU5U2pidEtGK1hTN1Y3QXF5YnNwS2gxZXIxUDN4Y3hMamEzY0l5ak9RUitMbHROQkE9PSJ9","signature":"aa702d3baa9107e9121943a08b4b5dadea5065a1cd26888d4129e5a1a60b8e6a","caveats":[{"cid":"declared username frankban"},{"cid":"time-before 2018-07-18T16:10:38.424634398Z"}]}]]`);


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
  conn.facades.client.fullStatus({}, (err, result) => {
    console.log(result);
    done({});
  });
}


process([addName, checkStatus, checkShellStatus], console.log);

