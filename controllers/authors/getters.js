const SteelToe = require('steeltoe');

exports.getAllAuthors = (req, res, next) => {
  console.log('Inside get All authors method.');
  res.status(200).send({ success: true, data: { authors: [{id: 1}, {id: 2}, {id: 3}] } });
}

exports.getAuthorByDate = (req, res, next) => {

  const date = SteelToe(req)('params')('date')() || Date.now();
  console.log('Inside get Author name By Date method.');
  res.status(200).send({ success: true, data: { authors: [{id: 1, date}, {id: 2, date}, {id: 3, date}] } });
}