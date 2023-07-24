const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const { hashPassword, comparePassword } = require('../helper');

async function getAdminList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM admins LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
};

async function adminLogin(admin) {
    const username = admin.username;
    const password = admin.password;

    if (!username.trim()) {
        message = 'Error: username is required';
    }
    if (!password) {
        message = 'Error: password is required';
    }
    const currentPassword = await db.query(
        `        
        SELECT adminPassword FROM admins
        WHERE (adminUsername = "${username}");
        `);   


    const match = await comparePassword(password, currentPassword[0].adminPassword);
    if (match) {    
        message = 'Login successfully';
    } else {
        message = 'Wrong password';
    }

    return { message };
};

async function hashingPassword(id) {  

    const currentPassword = await db.query(
        `        
        SELECT adminPassword FROM admins
        WHERE (id = ${id});
        `);

    const hashedPwd = await hashPassword(currentPassword[0].adminPassword);

    let message = 'Wrong password';
    const hasher = await db.query(
        `
        UPDATE admins
        SET adminPassword = "${hashedPwd}"
        WHERE id = ${id};
        `
    )

    if (currentPassword[0].adminPassword != hashedPwd) {
        message = 'Hashed successfully';
    }

    return { message };
};

module.exports = {
    getAdminList,
    adminLogin,
    hashingPassword
};