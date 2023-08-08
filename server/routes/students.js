const express = require('express');
const router = express.Router();
const students = require('../services/students');

/* GET all students */
router.get('/all', async function (req, res, next) {
    try {
        res.json(await students.getStudentList(req.query.page));
    } catch (err) {
        console.error(`Lỗi khi lấy danh sách học viên `, err.message);
        next(err);
    }
});

/* GET 1 student */
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await students.getStudent(req.params.id));
    } catch (err) {
        console.error(`Lỗi khi lấy thông tin học viên `, err.message);
        next(err);
    }
});

/* PUT student */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await students.updateStudent(req.params.id, req.body));
    } catch (err) {
        console.error(`Cập nhật thông tin học viên không thành công `, err.message);
        next(err);
    }
});

/* DELETE student */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await students.removeStudent(req.params.id));
    } catch (err) {
        console.error(`Xóa học viên không thành công `, err.message);
        next(err);
    }
});

module.exports = router;