var express = require('express');
var router = express.Router();
var createError = require('http-errors');


router.get('/', function(req, res, next) {
    res.render('content/login', { title: 'Express' , username:"Moises"});
  });

  router.post('/sing-in', function(req, res, next) {
    res.render('content/index', { title: 'Express' , username:"Moises"});
  });
