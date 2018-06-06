// Copyright 2018 Canonical Ltd.
// Licensed under the LGPLv3, see LICENCE.txt file for details.

'use strict';


function wrapPinger(cls) {
    cls.prototype.pingForever = function(interval, callback) {
        const timer = setInterval(() => {
            this.ping(err => {
                callback(err);
            });
        }, interval);
        return {
            stop: function() {
                clearInterval(timer);
            }
        };
    };
    return cls;
}


module.exports = {
    wrapPinger: wrapPinger
};