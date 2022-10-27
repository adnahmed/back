var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/user/farm/monogram', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(__dirname + "\\error.jpg")
});

module.exports = router;
