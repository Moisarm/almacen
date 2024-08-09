const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {createUser} = require('../controller/user/user')

router.get('/', function(req, res, next) {
   
  
  
  
  
  res.render('content/login', { title: 'Express' , username:"Moises"});
});

  router.post('/sing-in', function(req, res, next) {
    res.render('content/index', { title: 'Express' , username:"Moises"});
  });
