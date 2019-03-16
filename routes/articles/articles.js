var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { ArticleConstants } = require('../../constants')

const { Articles } = require('../../controllers');

router.get('/all', Articles.Getters.getAllArticles);
router.get('/by_city/:city_name', check('city_name').custom((value, { req }) => {
  console.log('value is:', value, ' req.params.city_name is:', req.params.city_name, 'bjkb', ArticleConstants.CITIES.indexOf(value));
  if (ArticleConstants.CITIES.indexOf(value) < 0) {
    console.log('Inside if');
    throw new Error('City for which you are looking for is not found');
  }
}), Articles.Getters.getArticleByCity)
router.get('/:date?', Articles.Getters.getArticleByDate)

router.get('/:title?/:description?', Articles.Getters.getArticleByTitleAndDescription)

module.exports = router;