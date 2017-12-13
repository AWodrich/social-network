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

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


// const url = require('url');


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

// putting csrf token into cookie through this middleware
// app.use(csrf());
// app.use(function(req, res, next){
//     res.cookie('mytoken', req.csrfToken());
//     next();
// });
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
  req.session = null;
  res.redirect('/welcome/')
});


// 5. Part3
app.get('/user', (req, res) => {
    database.getUserInfo(req.session.user.id)
    .then(results => {
        const { first, last, bios, image, id } = results
        res.json({
            first,
            last,
            imageUrl: image,
            id: req.session.user.id,
            bios
        })
    })
    .catch(err => {
        console.log(err);
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
    database.updatedBio(req.body.bio, req.session.user.id)
    .then(results => {
        res.json({
            success:true,
            newBio: req.body.bio
        })
    })
})


// 8. Get data from specific user by his/her id

app.get('/user.json/:id', (req, res) => {
    database.getSpecificUserData(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err);
    })

})


// Check Friendship status

app.get('/friend-status/:id', (req, res) => {
    const recipientId = req.params.id;
    const loggedInUserId = req.session.user.id;
    database.checkFriendStatus(recipientId, loggedInUserId)
    .then(results => {
        console.log(results);
        if (!results) {
            res.json({status: 0})
        }
        res.json({status:results.status, senderId: results.sender_id, recipientId: results.recipient_id})
    })
    .catch(err => {
        console.log(err);
    })
})

// status 1 = pending friendrequest, 2 = friendrequest canceled, 3 = friendrequest accepted, 4 = friendship terminated

// Update Friendship status

app.post('/friend-status/:id/update', (req, res) => {
    var newStatus;
    if(req.body.status == 0) {
        database.insertFriendStatus(1, req.session.user.id, req.params.id)
        .then(result => {
            res.json({status: 1})
        })
    } else if(req.body.status == 1 || req.body.status == 4) {
        database.deleteFriendStatus(req.session.user.id, req.params.id)
        .then(result => {
            res.json({status: 0})
        })
    } else if(req.body.status == 3) {
        database.updateFriendshipStatus(3, req.session.user.id, req.params.id)
        .then(result => {
            res.json({status: 3})
        })
    }
})

app.get('/user/:id/friends', (req, res) => {
    database.getFriends(req.session.user.id)
    .then(friends => {
        res.json({friends})
    })
})

// Users Online

let users = [];

io.on('connection', socket => {
    console.log('Connected: %s users connected', users.length);

    // DISCONNECT, tells me how many users are still online, when a user has desconnected
    socket.on('disconnect', data => {
        let movinUserID;
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketId == socket.id) {
                movinUserID = users[i].userId;
                console.log('disconnected matched');
            }
        }

        users = users.filter(function(obj) {
            return obj.socketId !== socket.id;
        });

        let userIdCount = 0;
        for (let i = 0; i < users.length; i++) {
            if (movinUserID == users[i].userId) {
                userIdCount++;
            }
        }
        console.log('is there multiple disconnects?', userIdCount);
        if (userIdCount < 2) {
            io.sockets.emit('userLeft', {userLeft: movinUserID});
        } else {
            console.log('userStill here, had multiple connections');
        }
    });

});


app.get('/connected/:socketId', function(req, res, next) {

    if (!req.session.user) {
        return next();
    }
    users.push({userId: req.session.user.id, socketId: req.params.socketId});
    const ids = users.map(id => id.userId);
    database.getUsersByIds(ids)
    .then(results => {
        io.sockets.sockets[req.params.socketId].emit('usersOnline', results);
    })
    .catch(err => {
        console.log(err);
    })

    let movinUserID;
    for (let i = 0; i < users.length; i++) {
        if (users[i].socketId == req.params.socketId) {
            movinUserID = users[i].userId;
            console.log('connected matched');
        }
    }
    let userIdCount = 0;
    for (let i = 0; i < users.length; i++) {
        if (movinUserID == users[i].userId) {
            userIdCount++;
        }
    }
    console.log('is there multiple connects?', userIdCount);
    if (userIdCount < 2) {
        database.getUserById(movinUserID).then(results => {
            io.sockets.emit('userJoined', results);
        });

    } else {
        console.log('user already connected');
    }
});

// Chat

const messageArray = [];

app.post('/chat.json', (req, res) => {
    database.getUserById(req.session.user.id)
    .then(results => {
        let fullMessage = {
            first: results.first,
            last: results.last,
            profilepic: results.image,
            message: req.body.messageContents,
            id: req.session.user.id
        }
        messageArray.push(fullMessage);
        io.sockets.emit('newMessage', fullMessage);
    })
    .catch(err => console.log(err))
});

app.get('/chat.json', (req, res) => {
  console.log('get array++++++++++++++++++++++', messageArray);
  res.json(messageArray);
});


app.get('/news', (req, res) => {

        // console.log('what is response?', resp, url);
        // let data = '';
        // res.on('data', chunk => {
        //     data += chunk;
        //     // console.log('data', data);
        // })
        // res.on('end', () => {
        //     console.log(JSON.parse(data).explanation);
        // })
        // res.on('error', err => {
        //     console.log("Error:" + err.message);
        // })
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
server.listen(8080, function() {
    console.log("I'm listening.")
});
