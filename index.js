const express = require('express');
const app = express();
// compression is a core epress middleware, to compress text, that is being sent back to the browser.
// the browser knows automatically how to decompress the text.
const compression = require('compression');

// every time we need to regenerate the entire applicaton.

app.use(compression());

// test if we are in production, which would be heroku.
// when code is bundle.js, then go to a different server, here it would be localhost:8081;
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use(express.static('./public'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
