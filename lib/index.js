var path = require('path');

var plugin = require('cordova-plugin-browsersync');
var Q = require('q');

var appetize = require('./appetize');
var browserSync = require('./browserSync');
var cordova = require('./cordova-exec');

module.exports = function(token) {
    var patcher = new plugin.Patcher('.');
    var tunnelId = ('vw' + (Math.random() + '').substring(2)).substring(0, 19);
    var siteDir = path.resolve(__dirname, '../site');

    return Q().then(function() {
        return cordova.prepare();
    }).then(function() {
        return patcher.patch({
            server: 'http://' + tunnelId + '.localtunnel.me'
        });
    }).then(function() {
        return cordova.compile();
    }).then(function() {
        return browserSync(tunnelId, siteDir, patcher);
    }).then(function() {
        return appetize(token, tunnelId, siteDir);
    });
};
