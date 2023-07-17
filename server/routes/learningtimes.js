const express = require('express');
const router = express.Router();
const learningtimes = require('../services/statics');

/* GET learningtimes */
router.get('/', async function (req, res, next) {
    try {
        res.json(await learningtimes.getLearningTimeList(req.query.page));
    } catch (err) {
        console.error(`Error while getting learningtimes `, err.message);
        next(err);
    }
});

module.exports = router;