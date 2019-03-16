var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var { Authors, Articles, Categories, Tags } = require('./routes');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/authors', Authors.Authors);
app.use('/authors/:author_name/articles', (req, res, next) => {
  req.locals = {};
  req.locals.author_name = req.params.author_name;
  next();
}, Authors.Articles.Articles);
app.use('/tags/:tag_name/articles', (req, res, next) => {
  console.log('Inside tags');
  req.locals = {};
  req.locals.tag_name = req.params.tag_name;
  next();
}, Tags.Articles.Articles);
app.use('/categories/:category_name/articles', (req, res, next) => {
  console.log('Inside categories');
  req.locals = {};
  req.locals.category_name = req.params.category_name;
  next();
}, Categories.Articles.Articles);
app.use('/articles', Articles.Articles);
app.get('/', (req, res) => {
  res.send('I\'m developing a demo project for APIs!!!')
});

module.exports = app;