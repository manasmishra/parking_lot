const Axios = require('axios');
const { check, validationResult } = require('express-validator/check');
const { PreconditionFailed } = require('http-errors');
const rp = require('request-promise');
const cheerio = require('cheerio');

exports.getAllArticles = (req, res, next) => {
  console.log('Inside get All authors method.');
  res.status(200).send({ success: true, data: { articles: [{id: 1}, {id: 2}, {id: 3}] } });
}

exports.getArticleByTitleAndDescription = (req, res, next) => {
  const title = req.params.title;
  const description = req.params.description;
  console.log('Inside get All authors method.');
  res.status(200).send({ success: true, data: { 
    articles: [
      {id: 1, title, description},
      {id: 2, title, description},
      {id: 3, title, description}
    ]
  } });
}

exports.getArticleByDate = (req, res, next) => {
  const date = new Date(req.params.date);
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth();
  const day = date.getDay() < 10 ? '0'+date.getDay() : date.getDay();
  console.log('Inside getArticleByDate.', year, '/', month, '/', day);
  // Below is how we can call a 
  Axios.get('https://www.thehindu.com/archive/web/'+year+'/'+month+'/'+day)
  .then(function (response) {
    console.log('>>>>>>>>>', response);
    return res.status(200).send({ success: true, data: { 
      articles: [
        {id: 1, date},
        {id: 2, date},
        {id: 3, date}
      ]
    } });
  })
  .catch(function (error) {
    console.log('EEEEEEE', error);
    next(error);
  });
}

exports.getArticleByCity = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array()[0].msg !=='Invalid value') {
    // console.log('errors.array() is:', errors.array()[0].msg);
    next(PreconditionFailed(errors.array()[0].msg));
  }
  const city_name = req.params.city_name;
  rp('https://www.thehindu.com/news/cities/' + city_name)
  .then(function (response) {
    var $ = cheerio.load(cheerio('.feature-news', response).html());
    // console.log('>>>>>>>>>',d)
    var articles = [];
    $('.story-card-news > h3 > a', response).each(function(i, elm) {
      articles.push({title: $(this).text()});
      // console.log('h3>a', $(this).text()) // for testing do text() 
  });
  $('.story-card-news > h2 > a', response).each(function(i, elm) {
    articles.push({title: $(this).text()});
    // console.log('h2>a:', $(this).text()) // for testing do text() 
});
    return res.status(200).send(JSON.stringify({ success: true, articles: articles }));
  })
  .catch(function (error) {
    console.log('EEEEEEE', error);
    next(error);
  });
  // res.status(200).send({ success: true, data: { 
  //   articles: [
  //     {id: 1, city_name},
  //     {id: 2, city_name},
  //     {id: 3, city_name}
  //   ]
  // } });
}