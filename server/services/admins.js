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
        SELECT registers.courseId, registers.facilityId, registers.learningTimeId, students.studentName, students.studentEmail, registers.registerDate,registers.registerCourseStatusId, registers.cancellationReason
        FROM registers
        LEFT JOIN students ON registers.studentId=students.studentId
        WHERE ((registers.courseId=${id}) AND (registers.registerCourseStatusId!=4));
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