const express = require('express');

const router = express.Router();

//controllers
const all = require('../controllers/auth');

/* POST login */
router.post('/', async function (req, res, next) {
    try {
        res.json(await all.allLogin(req.body));
    } catch (err) {
        console.error(`Error while login`, err.message);
        next(err);
    }
});

/* POST hashing password */
router.post('/hash/admin/:id', async function (req, res, next) {
    try {
        res.json(await all.hashingAdminPassword(req.params.id));
    } catch (err) {
        console.error(`Error while hashing password`, err.message);
        next(err);
    }
});

router.post('/hash/teacher/:id', async function (req, res, next) {
    try {
        res.json(await all.hashingTeacherPassword(req.params.id));
    } catch (err) {
        console.error(`Error while hashing password`, err.message);
        next(err);
    }
});

module.exports = router;