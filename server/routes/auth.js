const express = require('express');

const router = express.Router();

//controllers
const admins = require('../controllers/auth');

//get admin list
router.get('/all', async function (req, res, next) {
    try {
        res.json(await admins.getAdminList(req.query.page));
    } catch (err) {
        console.error(`Error while getting admins `, err.message);
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
        console.error(`Error while login`, err.message);
        next(err);
    }
});

module.exports = router;