const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// avoiding injection
const csrf = require('csurf');
const csrfProtection = csrf();
const uidSafe = require('uid-safe');
// for Password hashing, setting sessions
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
// for uploading purposes
const multer = require('multer');
const path = require('path');
// importing files
const pw = require('./password');
const database = require('./database.js');
const s3 = require('./s3');
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Storing images
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});



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
app.use(express.static("public"));
app.use(express.static('uploads'));

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

// 1. Main Page
app.get('/', function(req, res){
    if(!req.session.user && req.session.url != '/'){
        res.redirect('/welcome/')
        return;
    }
    if(req.session.user && req.session.url == '/') {
        res.redirect('/profile')
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/welcome/', (req, res) => {
    if(req.session.user) {
        res.redirect('/')
    }
    res.sendFile(__dirname + '/index.html');
})

//   2. Registration page


app.post('/', (req, res) => {
        console.log('req.body', req.body);

          let first = req.body.first;
          let last = req.body.last;
          let password = req.body.password;
          let email = req.body.email;
          let imgUrl;
          if(!first || !last || !password || !email) {
              let error = "Please register to continue"
              res.json('Error')
          } else {
              pw.hashPassword(password).then(hashedPw => {
                  database.storeRegistrationData(first, last, email, hashedPw, imgUrl).then(id => {
                      req.session.user = {
                          first,
                          last,
                          email,
                          id
                      }
                      res.json({success: true})
                  }).catch(err => {
                      console.log(err);
                  });
              }).catch(err => {
                  console.log(err);
              })
          }
    });

    // 3. Login Page

app.post('/authorize', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.redirect('/login')
    } else {
        database.getLoginCreds(email)
        .then(loginData => {
            // console.log('loginData', loginData.imgid == true);
            // console.log('loginData', loginData);
            // console.log('logindata hashed_password', loginData.hashed_password);
            pw.checkPassword(password, loginData.hashed_password).then(doesMatch => {
                      if(!doesMatch) {
                          res.json({success:false})
                      } else {
                          req.session.user = {
                              id: loginData.id
                          }
                          res.json({
                              email: loginData.email,
                              id: loginData.id,
                              success: true,
                              imgId: loginData.imgid,
                              imageUrl: loginData.image
                          })
                      }
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
})


// 4. Logout Page

app.get('/logout', function(req, res) {
    console.log('in server logout route', req.session.user);
  req.session = null;
  res.redirect('/welcome/')
});


// 5. Part3
app.get('/user', (req, res) => {
    database.getUserInfo(req.session.user.id)
    .then(results => {
        console.log('results, after get user info', results);
        const { first, last, bios, image } = results
        res.json({
            first,
            last,
            imageUrl: image,
            id: req.session.user.id,
            bios
        })
    })
})


// 6. Uploading images
app.post('/upload', uploader.single('file'), (req, res) => {
    if (req.file) {
        s3.upload(req.file)
        .then(()  => {
            database.uploadImages(req.file.filename, req.session.user.id)
            .then(result=> {
                // res.redirect('/user')
                res.json({
                    success: true,
                    imgUrl: req.file.filename
                });
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })

    }
})


// 7. Updating Bio information

app.post('/update-bio', (req, res) => {
    database.updatedBio(req.body.updatedBio, req.session.user.id)
    .then(results => {
        res.json({
            success:true
        })
    })
})



// 1. Fallback route, the fail safe
// This route has to go on the bottom of this file.

app.get('*', function(req, res){
    if(!req.session.user && req.session.url != '/'){
        res.redirect('/')
        return;
    }
    if(req.session.user && req.session.url == '/') {
        res.redirect('/profile')
    }
    res.sendFile(__dirname + '/index.html');
});



//=================== setting up server ========================================//
app.listen(8080, function() {
    console.log("I'm listening.")
});
