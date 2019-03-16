var express = require('express');
var router = express.Router();

const { Authors } = require('../../controllers');

router.get('/all', Authors.Getters.getAllAuthors);

module.exports = router;