const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRegisterList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM registers LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getRegister(id) {
    const rows = await db.query(
        `SELECT *
    FROM registers 
    WHERE id=${id}`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function createNewRegister(studentRegister) {
    const name = studentRegister.name;
    const email = studentRegister.email;
    const phone = studentRegister.phone;
    
    if (!name.trim()) {
        message = 'Error: Name is required';
    }
    if (!email) {
        message = 'Error: Email is required';
    }
    if (!phone) {
        message = 'Error: Phone is required';
    }
    
    const result = await db.query(        
        `
        INSERT INTO students
        (studentName, studentEmail, studentPhone)
        SELECT * FROM (SELECT "${name}" AS studentName, "${email}", "${phone}" AS studentPhone) AS tmp
        WHERE NOT EXISTS (
            SELECT studentName FROM students WHERE (studentName = "${name}" and studentEmail = "${email}" and studentPhone = "${phone}")
        ) LIMIT 1;
        `);

    const courseId = studentRegister.courseId;
    const facilityId = studentRegister.facilityId;
    const learningTimeId = studentRegister.learningTimeId;

    const result2 = await db.query(
        `
        INSERT INTO registers(courseId, facilityId, learningTimeId, studentId, registerDate)
        SELECT * FROM (SELECT ${courseId} AS courseId, ${facilityId} AS facilityId, ${learningTimeId} AS learningTimeId, (SELECT studentId FROM students WHERE (studentName = "${name}" AND studentEmail = "${email}" AND studentPhone = "${phone}")) AS studentId, 
        NOW() AS registerDate) AS tmp
        WHERE NOT EXISTS (
            SELECT courseId FROM registers WHERE (courseId= ${courseId} AND facilityId= ${facilityId} AND learningTimeId = ${learningTimeId} and studentId = (SELECT studentId FROM students WHERE (studentName = "${name}" AND studentEmail = "${email}" AND studentPhone = "${phone}")))
        ) LIMIT 1;
        `);
    
    // let message = 'Error or Existed student while adding new register';

    if ((result.affectedRows) & (result2.affectedRows)) {
        message = 'Register added successfully';
    }

    return { message };
}

async function updateRegister(id, studentRegister) {
    const result = await db.query(
        `UPDATE registers 
    SET courseId=${studentRegister.courseId}, facilityId=${studentRegister.facilityId}, learningTimeId=${studentRegister.learningTimeId}, studentId=${studentRegister.studentId}, registerCourseStatusId=${studentRegister.registerCourseStatusId}, cancellationReason="${studentRegister.cancellationReason}"
    WHERE id=${id}`
    );

    let message = 'Error in updating register';

    if (result.affectedRows) {
        message = 'Register updated successfully';
    }

    return { message };
}

async function removeRegister(id) {
    const result = await db.query(
        `DELETE FROM registers WHERE id=${id}`
    );

    let message = 'Error in removing register';

    if (result.affectedRows) {
        message = 'Register removed successfully';
    }

    return { message };
}

module.exports = {
    getRegisterList,
    getRegister,
    createNewRegister,
    updateRegister,
    removeRegister
}