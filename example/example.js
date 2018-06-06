// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const WebSocket = require('websocket').w3cwebsocket;

const jujulib = require('../api/client.js');
const client = require('../output/client-v1.js');
const pinger = require('../output/pinger-v1.js');


const url = 'wss://35.196.177.51:17070/model/b3b8ce8e-a9e6-4687-82c9-366963900bdd/api';
jujulib.connect(url, [client, pinger], {wsclass: WebSocket}, (err, juju) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connected');

    juju.login({user: 'user-admin', password: 'aaa'}, (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('logged in');
        console.log(Object.keys(conn.facades));

        const pinger = conn.facades.pinger;
        console.log('ping');
        pinger.ping(err => {
            console.log('pong:', err);
        });
        console.log('ping')
        pinger.ping(err => {
            console.log('pong:', err);
        });
    });
});
