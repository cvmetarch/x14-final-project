const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getStudentList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM students LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getStudent(id) {
    const rows = await db.query(
        `SELECT *
    FROM students 
    WHERE studentId=${id}`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function updateStudent(id, student) {
    const result = await db.query(
        `UPDATE students 
    SET studentName="${student.name}", studentEmail="${student.email}", studentPhone="${student.phone}", studentDob="${student.dob}", studentGuardianName="${student.guardianName}", studentGuardianPhone="${student.guardianPhone}", studentGuardianRelative="${student.guardianRelative}"
    WHERE studentId=${id}`
    );

    let message = 'Error in updating student';

    if (result.affectedRows) {
        message = 'Student updated successfully';
    }

    return { message };
}

async function removeStudent(id) {
    const result = await db.query(
        `DELETE FROM students WHERE studentId=${id}`
    );

    let message = 'Error in removing student';

    if (result.affectedRows) {
        message = 'Student removed successfully';
    }

    return { message };
}

module.exports = {
    getStudentList,
    getStudent,
    updateStudent,
    removeStudent
}