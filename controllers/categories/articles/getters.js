const SteelToe = require('steeltoe');

exports.getAllArticles = (req, res, next) => {
  const categoryName = SteelToe(req)('locals')('category_name')() || 'default_category_name';
  console.log('Inside get All articles based on a category name method.');
  res.status(200).send({ success: true, data: { 
    category_name: categoryName,
    articles: [{id: 1}, {id: 2}, {id: 3}] } 
  });
}