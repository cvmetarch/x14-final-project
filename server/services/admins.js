const db = require('./db');
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

async function getStudentRegisterByCourse(id) {
    const rows = await db.query(
        `
        SELECT r.courseId, r.facilityId, r.learningTimeId, s.studentId, s.studentName, s.studentEmail, s.studentPhone, r.registerDate,r.registerCourseStatusId, r.cancellationReason
        FROM registers r
        LEFT JOIN students s ON r.studentId=s.studentId
        WHERE ((r.courseId=${id}) AND (r.registerCourseStatusId!=4));
    `);

    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getRegisterCourse() {
    const rows = await db.query(
        `
        SELECT courseId, count(CASE WHEN registerCourseStatusId < 4 THEN registerCourseStatusId END) as registeredCount
        FROM registers
        Group By courseId
        HAVING registeredCount > 0;
    `);

    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

module.exports = {
    getAdminList,
    getStudentRegisterByCourse,
    getRegisterCourse
};