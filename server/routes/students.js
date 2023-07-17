const express = require('express');
const router = express.Router();
const students = require('../services/students');

/* GET students */
router.get('/', async function (req, res, next) {
    try {
        res.json(await students.getStudentList(req.query.page));
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});

module.exports = router;