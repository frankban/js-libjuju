// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const WebSocket = require('websocket').w3cwebsocket;

const jujulib = require('../api/client.js');

const AllWatcher = require('../output/all-watcher-v1.js');
const Application = require('../output/application-v5.js');
const Client = require('../output/client-v1.js');
const Pinger = require('../output/pinger-v1.js');


const url = 'wss://35.196.177.51:17070/model/1d674dd5-3d5a-4512-847c-9505959f8bfa/api';
const options = {
  debug: true,
  facades: [AllWatcher, Application, Client, Pinger],
  wsclass: WebSocket
};
jujulib.connect(url, options, (err, juju) => {
  if (err) {
    console.log(err);
    return;
  }

  juju.login({user: 'user-admin', password: 'aaa'}, (err, conn) => {
    if (err) {
        console.log(err);
        return;
    }
    const client = conn.facades.client;
    const pinger = conn.facades.pinger;
    const application = conn.facades.application;
    // const handle = pinger.pingForever(1000, err => {
    //     console.log('pong', err);
    // });
    // setTimeout(handle.stop, 10000);

    // client.addCharm({url: 'cs:haproxy-43'}, err => {
    //   if (err) {
    //     console.log('cannot add charm:', err);
    //     return;
    //   }
    //   application.deploy({
    //     applications: [{
    //       application: 'ha',
    //       charmUrl: 'cs:haproxy-43', 
    //       series: 'xenial'
    //     }]
    //   }, (err, result) => {
    //     if (err) {
    //       console.log('cannot deploy app:', err);
    //       return;
    //     }
    //     console.log(result);
    //   });
    // });

    const handle = client.watch((err, result) => {
      if (err) {
        console.log('cannot watch model:', err);
        return;
      }
      console.log(result);
    });
    setTimeout(handle.stop, 5000);

  });
});
