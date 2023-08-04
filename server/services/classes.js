const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClassList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM classes LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getClass(id) {
    const rows = await db.query(
        `SELECT c.classId, c.courseId, c.className, c.learningTimeId, s.studentId, t.teacherId, t.teacherRoleId, c.startDate, c.endDate
FROM classes c
inner JOIN studentsperclass s
ON (c.classId=${id} AND s.classId=${id})
inner JOIN teachersperclass t
ON (c.classId=${id} AND t.classId=${id});`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function createClass(classBody) {
    const courseId = classBody.courseId;
    const className = classBody.name;
    const timeId = classBody.timeId;
    const startDate = classBody.startDate;
    const endDate = classBody.endDate;

    const result = await db.query(
        `
        INSERT INTO classes
        (courseId, className, learningTimeId, startDate, endDate)
        VALUES
        (${courseId}, "${className}", ${timeId}, "${startDate}", "${endDate}");
        `
    );

    let message = 'Tạo lớp học không thành công!';

    if (result.affectedRows) {
        message = 'Khởi tạo lớp học thành công!';
    }

    return { message };
}

async function updateClass(id, classBody) {
    const courseId = classBody.courseId;
    const className = classBody.name;
    const timeId = classBody.timeId;
    const startDate = classBody.startDate;
    const endDate = classBody.endDate;

    const result = await db.query(
        `
        UPDATE classes 
        SET courseId="${courseId}", className="${className}", learningTimeId="${timeId}", startDate="${startDate}", endDate="${endDate}"
        WHERE classId=${id}
        `
    );
    
    const studentId = classBody.studentId;
    if (studentId!=0) {
    const resultStudent = await db.query(
        `        
        INSERT INTO studentsPerClass(classId, studentId)
        VALUES (${id}, ${studentId});
        `);
    };

    const teacherId = classBody.teacherId;
    const teacherRoleId = classBody.teacherRoleId;

    if ((teacherId!=0) & (teacherRoleId!=0)) {
    const resultTeacher = await db.query(
        `
        INSERT INTO teachersPerClass(classId, teacherId, teacherRoleId)
        VALUE (${id}, ${teacherId}, ${teacherRoleId});
        `);
    };

    let message = 'Cập nhật không thành công!';

    if (result.affectedRows) {
        message = 'Cập nhật thông tin lớp học thành công!';
    }

    return { message };
}

async function removeClass(id) {
    const result = await db.query(
        `DELETE FROM classes WHERE classId=${id}`
    );

    let message = 'Hủy lớp không thành công!';

    if (result.affectedRows) {
        message = 'Hủy lớp thành công!';
    }

    return { message };
}

module.exports = {
    getClassList,
    getClass,
    createClass,
    updateClass,
    removeClass
}