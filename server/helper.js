// helpers.auth.js
const bcrypt = require('bcrypt');

function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    });
};

function comparePassword(password, hashed){
    return bcrypt.compare(password, hashed);
};

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    hashPassword,
    comparePassword,
    getOffset,
    emptyOrRows
}