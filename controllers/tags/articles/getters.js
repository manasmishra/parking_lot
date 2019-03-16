const SteelToe = require('steeltoe');

exports.getAllArticles = (req, res, next) => {
  const tagName = SteelToe(req)('locals')('tag_name')() || 'default_tag_name';
  console.log('Inside get All Articles based on a tag name method.');
  res.status(200).send({ success: true, data: { 
    tag_name: tagName,
    articles: [{id: 1}, {id: 2}, {id: 3}] } 
  });
}