var express = require('express');
var router = express.Router();

const { Categories } = require('../../../controllers');

router.get('/all', (req, res, next) => {
  console.log('req.locals:',  req.locals);
  next();
}, Categories.Articles.Getters.getAllArticles);

module.exports = router;