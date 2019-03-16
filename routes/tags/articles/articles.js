var express = require('express');
var router = express.Router();

const { Tags } = require('../../../controllers');

router.get('/all', (req, res, next) => {
  console.log('req.locals:',  req.locals);
  next();
}, Tags.Articles.Getters.getAllArticles);

module.exports = router;