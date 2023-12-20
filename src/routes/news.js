const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/other-1', newsController.other1);
router.get('/other-2', newsController.other2);
router.get('/:slug', newsController.noResult);
router.get('/', newsController.index);

module.exports = router;
