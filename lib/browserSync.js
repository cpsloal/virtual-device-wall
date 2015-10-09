var Q = require('q');
var plugin = require('cordova-plugin-browsersync');

module.exports = function(tunnelId, siteDir, patcher) {
    var platforms = ['android', 'ios'];
    return Q.Promise(function(resolve, reject, nofify) {
        var bs = plugin.browserSyncServer(function(defaults) {
            defaults.files.push({
                match: ['www/**/*.*'],
                fn: function(event, file) {
                    if (event === 'change') {
                        patcher.addCSP();
                        bs.reload();
                    }
                }
            });

            defaults.server = {
                baseDir: platforms.map(patcher.getWWWFolder.bind(patcher)).concat(siteDir),
                routes: {
                    '/wall': siteDir
                }
            }

            platforms.forEach(function(platform) {
                var www = patcher.getWWWFolder(platform);
                defaults.server.routes['/' + www] = www;
            });

            defaults.tunnel = tunnelId;
            return defaults;
        }, function(err, server) {
            if (err) {
                reject(err);
            } else {
                resolve(server);
            }
        });
    });
};