const express = require('express');

const router = express.Router();

//controllers
const teachers = require('../services/teachers');

//get teacher list
router.get('/all', async function (req, res, next) {
    try {
        res.json(await teachers.getTeacherList(req.query.page));
    } catch (err) {
        console.error(`Error while getting teacher list `, err.message);
        next(err);
    }
});

module.exports = router;