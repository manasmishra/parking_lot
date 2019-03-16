

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
  const date = req.params.date || Date.now();
  console.log('Inside getArticleByDate.', date);
  res.status(200).send({ success: true, data: { 
    articles: [
      {id: 1, date},
      {id: 2, date},
      {id: 3, date}
    ]
  } });
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