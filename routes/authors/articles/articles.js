var express = require('express');
var router = express.Router();

const { Authors } = require('../../../controllers');

router.get('/all', (req, res, next) => {
  console.log('req.locals:',  req.locals);
  next();
}, Authors.Articles.Getters.getAllArticles);

module.exports = router;