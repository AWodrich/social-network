const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');
const cookieSession = require("cookie-session");
const pw = require('./password');
const cookieParser = require('cookie-parser');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();


// ========= compress text, that is sent to the browser ==============================
const compression = require('compression');

// ========== test if app in production, which would be heroku.
// when code is bundle.js, then go to a different server, here it would be localhost:8081;
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

// ========= make webpage secure ==============================
app.disable('x-powered-by');

// ========= make sure your side cannot being put into a frame =====
app.use((req, res, next) => {
    res.setHeader('x-frame-options', 'deny');
    next();
});

// ====== serve static directory ==================================
app.use('/public', express.static("public"));
// every time we need to regenerate the entire applicaton.

// ====== use cookie, cookie-session, bodyParser and compression ================
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieSession({
    secret: 'my secret is a secret that secretly secrets itself',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(bodyParser.json())
app.use(compression());

// ============== routes =================

// 1. Main route
app.get('*', function(req, res){
    // if(!req.session.user && req.session.url != '/welcome'){
    //     res.redirect('/welcome')
    //     return;
    // }
    res.sendFile(__dirname + '/index.html');
});


//   2. Registration page


app.post('/', (req, res) => {
        console.log('req.body', req.body);

          let first = req.body.fname;
          let last = req.body.lname;
          let password = req.body.password;
          let email = req.body.email;
          if(!first || !last || !password || !email) {
              let error = "Please register to continue"
              res.json('Error')
          } else {
              pw.hashPassword(password).then(hashedPw => {
                  database.storeRegistrationData(first, last, email, hashedPw).then(id => {
                      req.session.user = {
                          first,
                          last,
                          email,
                          id
                      }
                      res.json(id)
                  }).catch(err => {
                      console.log(err);
                  });
              }).catch(err => {
                  console.log(err);
              })
          }
    });

//=================== setting up server ========================================//
app.listen(8080, function() {
    console.log("I'm listening.")
});
