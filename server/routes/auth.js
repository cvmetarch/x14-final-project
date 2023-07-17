const express = require('express');

const router = express.Router();

//controllers
const admin = require('../controllers/auth');

router.get("/admin", admin);

module.exports = router;