

exports.getAllArticles = (req, res, next) => {
  const authorName = req.locals.author_name || 'default';
  console.log('Inside get All authors method.');
  res.status(200).send({ success: true, data: { 
    author_name: authorName,
    articles: [{id: 1}, {id: 2}, {id: 3}] } 
  });
}