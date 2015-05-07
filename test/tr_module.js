var mdeps = require('../');
var test = require('tape');
var JSONStream = require('jsonstream');
var packer = require('browser-pack');
var path = require('path');

test('transform', function (t) {
    t.plan(4);
    var p = mdeps({
        transform: [ 'insert-aaa', 'insert-bbb' ],
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end(path.join(__dirname, '/files/tr_module/main.js'));
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('t', src)(t);
    });
});
