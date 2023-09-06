const jwt = require('jsonwebtoken');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const all = require('../controllers/auth');

async function requireSignin(req, res, next) {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};

async function isAdmin(req, res, next) {
    try {
        const userName = req.user.username;
        let userRole = 0;
        if (userName == 'admin' | userName == 'moderator') {
            userRole = 1;
        };
        if (userRole !== 1) {
            return res.status(401).send("Unauthorized");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    requireSignin,
    isAdmin
};
