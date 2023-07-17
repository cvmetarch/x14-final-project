const express = require('express');
const router = express.Router();
const facilities = require('../services/statics');

/* GET facilities */
router.get('/', async function (req, res, next) {
    try {
        res.json(await facilities.getFacilityList(req.query.page));
    } catch (err) {
        console.error(`Error while getting facilities `, err.message);
        next(err);
    }
});

module.exports = router;