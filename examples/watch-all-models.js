// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

const WebSocket = require('websocket').w3cwebsocket;
const bakery = require('macaroon-bakery');
// Bakery uses btoa and MLHttpRequest.
global.btoa = require('btoa');
global.XMLHttpRequest = require('xhr2')

const jujulib = require('../api/client.js');


// Connect to Juju and provide the connection object to the callback.
function connect(callback) {
  const options = {
    debug: true,
    facades: [
      require('../api/facades/all-model-watcher-v2.js'),
      require('../api/facades/controller-v3.js')
    ],
    wsclass: WebSocket,
    bakery: new bakery.Bakery({
      visitPage: resp => {
        console.log('visit this URL to login:', resp.Info.VisitURL);
      }
    })
  };
  const url = 'wss://jimm.jujucharms.com/api';
  jujulib.connect(url, options, (err, juju) => {
    if (err) {
      console.log('cannot connect to controller:', err);
      process.exit(1);
    }

    juju.login({}, (err, conn) => {
      if (err) {
        console.log('cannot login to controller:', err);
        process.exit(1);
      }
      callback(conn);
    });
  });
}


connect(conn => {
  // Start watching all models.
  const controller = conn.facades.controller;
  let handle;
  handle = controller.watch((err, result) => {
    if (err) {
      console.log('cannot watch models:', err);
      process.exit(1);
    }
    console.log(result.deltas);
    hanlde.stop(process.exit)
  });
});
