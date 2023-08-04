const express = require('express');
const { requireSignin, isAdmin } = require('../middlewares/auth');
const router = express.Router();

//controllers
const admins = require('../services/admins');

//get admin list
router.get('/all', async function (req, res, next) {
    try {
        res.json(await admins.getAdminList(req.query.page));
    } catch (err) {
        console.error(`Error while getting admin list `, err.message);
        next(err);
    }
});

//get register course
router.get('/courses', requireSignin, isAdmin, async function (req, res, next) {
    try {
        res.json(await admins.getRegisterCourse(req.body));
    } catch (err) {
        console.error(`Error while getting registered courses`, err.message);
        next(err);
    }
});

//get student register by course
router.get('/course/:id', requireSignin, isAdmin, async function (req, res, next) {
    try {
        res.json(await admins.getStudentRegisterByCourse(req.params.id));
    } catch (err) {
        console.error(`Error while getting students by course`, err.message);
        next(err);
    }
});

module.exports = router;