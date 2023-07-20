const express = require('express');
const router = express.Router();
const students = require('../services/students');

/* GET all students */
router.get('/all', async function (req, res, next) {
    try {
        res.json(await students.getStudentList(req.query.page));
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});

/* GET 1 student */
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await students.getStudent(req.params.id));
    } catch (err) {
        console.error(`Error while getting student `, err.message);
        next(err);
    }
});

/* PUT student */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await students.updateStudent(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating student`, err.message);
        next(err);
    }
});

/* DELETE student */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await students.removeStudent(req.params.id));
    } catch (err) {
        console.error(`Error while deleting student`, err.message);
        next(err);
    }
});

module.exports = router;