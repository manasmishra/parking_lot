var express = require('express');
var router = express.Router();

const { Authors } = require('../../controllers');

router.get('/all', Authors.Getters.getAllAuthors);
router.get('/:date', Authors.Getters.getAuthorByDate);

module.exports = router;