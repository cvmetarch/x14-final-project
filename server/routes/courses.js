const express = require('express');
const router = express.Router();
const courses = require('../services/statics');

/* GET courses */
router.get('/', async function (req, res, next) {
    try {
        res.json(await courses.getCourseList(req.query.page));
    } catch (err) {
        console.error(`Lỗi khi lấy danh sách khóa học `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await courses.getCourse(req.params.id));
    } catch (err) {
        console.error(`Lỗi khi lấy thông tin khóa học `, err.message);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        res.json(await courses.createCourse(req.body));
    } catch (err) {
        console.error(`Lỗi khi tạo khóa học `, err.message);
        next(err);
    }
});

module.exports = router;