const express = require('express');
const router = express.Router();
const registers = require('../services/registers');

/* GET all registers */
router.get('/all', async function (req, res, next) {
    try {
        res.json(await registers.getRegisterList(req.query.page));
    } catch (err) {
        console.error(`Error while getting registers `, err.message);
        next(err);
    }
});

/* GET 1 register */
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await registers.getRegister(req.params.id));
    } catch (err) {
        console.error(`Error while getting register `, err.message);
        next(err);
    }
});

/* POST new register */
router.post('/', async function (req, res, next) {
    try {
        res.json(await registers.createNewRegister(req.body));
    } catch (err) {
        console.error(`Error while adding new register`, err.message);
        next(err);
    }
});

/* PUT register */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await registers.updateRegister(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating register`, err.message);
        next(err);
    }
});

/* DELETE register */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await registers.removeRegister(req.params.id));
    } catch (err) {
        console.error(`Error while deleting register`, err.message);
        next(err);
    }
});

module.exports = router;