const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored', meController.stored);
router.get('/stored/courses', meController.storedCourses);
router.get('/stored/courses/page-:page', meController.storedCourses); // pagination
router.get('/trash/courses', meController.trashCourses);
router.get('/stored/blog', meController.storedBlog);
router.get('/stored/courses/:slug', meController.noResult);
router.get('/:slug', meController.noResult);
router.get('/', meController.noResult);

module.exports = router;
