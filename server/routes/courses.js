const express = require('express');
const router = express.Router();
const courses = require('../services/statics');

/* GET courses */
router.get('/', async function (req, res, next) {
    try {
        res.json(await courses.getCourseList(req.query.page));
    } catch (err) {
        console.error(`Error while getting courses `, err.message);
        next(err);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        res.json(await courses.createCourse(req.body));
    } catch (err) {
        console.error(`Error while creating course `, err.message);
        next(err);
    }
});

module.exports = router;