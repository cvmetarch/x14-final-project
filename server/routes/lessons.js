const express = require('express');
const router = express.Router();
const lessons = require('../services/statics');

/* GET lessons */
router.get('/', async function (req, res, next) {
    try {
        res.json(await lessons.getLessonList(req.query.page));
    } catch (err) {
        console.error(`Error while getting lessons `, err.message);
        next(err);
    }
});

module.exports = router;