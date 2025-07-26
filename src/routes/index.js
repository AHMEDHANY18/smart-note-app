var express = require('express');
var app = express();
var user = require('./user/router.js')

/* GET home page. */
app.use("/user", user)


module.exports = app;
