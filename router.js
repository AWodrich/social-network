var   express = require('express'),
      router = express.Router(),
      csrf = require('csurf'),
      csrfProtection = csrf();
const pw = require('./password');
const database = require('./database');
