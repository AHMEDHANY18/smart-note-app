var express = require('express');
var app = express();
var user = require('./user/router.js')
var note = require('./note/router.js')

/* GET home page. */
app.use("/user", user)
app.use("/note", note)


module.exports = app;
