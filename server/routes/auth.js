const express = require('express');

const router = express.Router();

//controllers
const admins = require('../controllers/auth');

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
router.get('/courses', async function (req, res, next) {
    try {
        res.json(await admins.getRegisterCourse(req.body));
    } catch (err) {
        console.error(`Error while getting registerd courses`, err.message);
        next(err);
    }
});

//get student register by course
router.get('/course/:id', async function (req, res, next) {
    try {
        res.json(await admins.getStudentRegisterByCourse(req.params.id));
    } catch (err) {
        console.error(`Error while getting students by course`, err.message);
        next(err);
    }
});

/* POST login */
router.post('/', async function (req, res, next) {
    try {
        res.json(await admins.adminLogin(req.body));
    } catch (err) {
        console.error(`Error while login`, err.message);
        next(err);
    }
});

/* POST hashing password */
router.post('/hash/:id', async function (req, res, next) {
    try {
        res.json(await admins.hashingPassword(req.params.id));
    } catch (err) {
        console.error(`Error while hashing password`, err.message);
        next(err);
    }
});

module.exports = router;