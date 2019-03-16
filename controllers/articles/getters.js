const Axios = require('axios');

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
  const city_name = req.params.city_name;
  console.log('Inside getArticleByCity.', city_name);
  res.status(200).send({ success: true, data: { 
    articles: [
      {id: 1, city_name},
      {id: 2, city_name},
      {id: 3, city_name}
    ]
  } });
}