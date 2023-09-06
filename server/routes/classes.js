const express = require('express');
const { requireSignin, isAdmin } = require('../middlewares/auth');
const router = express.Router();

const classes = require('../services/classes');

/* GET classes */
router.get('/', requireSignin, isAdmin, async function (req, res, next)  {
    try {
        res.json(await classes.getClassList(req.query.page));
    } catch (err) {
        console.error(`Error while getting classes `, err.message);
        next(err);
    }
});

/* GET 1 class */
router.get('/:id', requireSignin, isAdmin, async function (req, res, next) {
    try {
        res.json(await classes.getClass(req.params.id));
    } catch (err) {
        console.error(`Error while getting class `, err.message);
        next(err);
    }
});


router.post('/create', requireSignin, isAdmin, async function (req, res, next) {
    try {
        res.json(await classes.createClass(req.body));
    } catch (err) {
        console.error(`Error while creating class `, err.message);
        next(err);
    }
});

/* PUT class */
router.put('/:id', requireSignin, isAdmin, async function (req, res, next) {
    try {
        res.json(await classes.updateClass(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating class`, err.message);
        next(err);
    }
});


module.exports = router;