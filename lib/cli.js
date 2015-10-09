var wall = require('./index');

var token = 'tok_4k6bwbw1k3zq0fjqhupymajpk4';

require('q').longStackSupport = true;

wall(token).then(function() {
    console.log('Keep this process running ...');
}).done();
