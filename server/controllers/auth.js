const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const { hashPassword, comparePassword } = require('../helper');
const jwt = require('jsonwebtoken');

async function allLogin(admin) {
    const username = admin.username;
    const password = admin.password;
    let roleName = 'Giảng viên';
    let match = false;
    let token;
    
    if (!username.trim()) {
        message = "Vui lòng điển tên đăng nhập!";
        return { message };
    };
    if (!password) {        
        message = "Vui lòng điển mật khẩu!";
        return { message };
    }
    
    if (username == 'admin' | username == 'moderator'){
        const currentPassword = await db.query(
        `        
        SELECT adminPassword FROM admins
        WHERE (adminUsername = "${username}");
        `);        
        match = await comparePassword(password, currentPassword[0].adminPassword);
        roleName = 'Admin';
    } else {
        const currentPassword = await db.query(
        `        
        SELECT teacherPassword FROM teachers
        WHERE (teacherUsername = "${username}");
        `);
        match = await comparePassword(password, currentPassword[0].teacherPassword);
    };
    
    if (match) {
        message = `${roleName} đăng nhập thành công!`;
        token = jwt.sign({ username: username }, process.env.JWT_SECRET,{
            expiresIn: "7d",});
    } else {
        message = 'Tên đăng nhập hoặc Mật khẩu không chính xác!';
    };
    
    return { message, username, token };
};

async function hashingAdminPassword(id) {  
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

async function hashingTeacherPassword(id) {
    const currentPassword = await db.query(
        `        
        SELECT teacherPassword FROM teachers
        WHERE (teacherId = ${id});
        `);

    const hashedPwd = await hashPassword(currentPassword[0].teacherPassword);

    let message = 'Wrong password';
    const hasher = await db.query(
        `
        UPDATE teachers
        SET teacherPassword = "${hashedPwd}"
        WHERE teacherId = ${id};
        `
    )

    if (currentPassword[0].teacherPassword != hashedPwd) {
        message = 'Hashed successfully';
    }

    return { message };
};

module.exports = { 
    allLogin,
    hashingAdminPassword,
    hashingTeacherPassword
};