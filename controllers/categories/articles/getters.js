const SteelToe = require('steeltoe');
const rp = require('request-promise');
const cheerio = require('cheerio');

exports.getAllArticles = (req, res, next) => {
  const categoryName = SteelToe(req)('locals')('category_name')() || 'default_category_name';
  // console.log('Inside get All articles based on a category name method.');
  rp('https://www.thehindu.com/news/' + categoryName)
  .then(function (response) {
    var $ = cheerio.load(cheerio('.story-card', response).html());
    // console.log('>>>>>>>>>',d)
    var articles = [];
    $('.story-card-news > h3 > a', response).each(function(i, elm) {
      articles.push({title: $(this).text()});
      // console.log('h3>a', $(this).text()) // for testing do text() 
    });
    $('.story-card-news > h2 > a', response).each(function(i, elm) {
      articles.push({title: $(this).text()});
      // console.log('h3>a', $(this).text()) // for testing do text() 
    });
    return res.status(200).send(JSON.stringify({ success: true, articles: articles }));
  })
  .catch(function (error) {
    console.log('EEEEEEE', error);
    next(error);
  });
  // res.status(200).send({ success: true, data: { 
  //   category_name: categoryName,
  //   articles: [{id: 1}, {id: 2}, {id: 3}] } 
  // });
}