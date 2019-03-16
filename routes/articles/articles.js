var express = require('express');
var router = express.Router();

const { Articles } = require('../../controllers');

router.get('/all', Articles.Getters.getAllArticles);
router.get('/by_city/:city_name', Articles.Getters.getArticleByCity)
router.get('/:date?', Articles.Getters.getArticleByDate)

router.get('/:title?/:description?', Articles.Getters.getArticleByTitleAndDescription)

module.exports = router;