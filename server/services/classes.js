const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClassList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `
        SELECT c.*, co.courseName, CONCAT(left(l.startTime,5),'-',left(l.endTime,5),' ',l.weekDay) as lTime
        FROM classes c 
        inner JOIN learningtimes l ON c.learningTimeId=l.learningTimeId
        inner JOIN courses co on (c.courseId=co.courseId)
        LIMIT ${offset},${config.listPerPage}
    `
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
    `
        SELECT DISTINCT c.classId, c.courseId, co.courseName, c.className, c.learningTimeId, CONCAT(left(l.startTime,5),'-',left(l.endTime,5),' ',l.weekDay) as lTime, s.studentId, t.teacherId, t.teacherRoleId, c.startDate, c.endDate
        FROM classes c
        inner JOIN studentsperclass s ON (c.classId=${id} AND s.classId=${id})
        inner JOIN teachersperclass t ON (c.classId=${id} AND t.classId=${id})
        inner JOIN courses co on (c.courseId=co.courseId)
        inner JOIN learningtimes l ON c.learningTimeId=l.learningTimeId
        WHERE (t.teacherRoleId=1);
    `
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
        SELECT * FROM(SELECT ${courseId} cId, "${className}" cName, ${timeId} tId, "${startDate}" sDate, "${endDate}" eDate) tmp
        WHERE NOT EXISTS(
            SELECT courseId FROM classes WHERE(courseId = ${courseId} and className = "${className}" and learningTimeId = ${timeId} and startDate = "${startDate}" and endDate = "${endDate}")
        ) LIMIT 1;
        `);

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

    let message = 'Cập nhật không thành công!';
    let resultStudent;
    let resultTeacher;
    const result = await db.query(
        `
        UPDATE classes 
        SET courseId=${courseId}, className="${className}", learningTimeId=${timeId}, startDate="${startDate}", endDate="${endDate}"
        WHERE (classId=${id} and (courseId!=${courseId} or className!="${className}" or learningTimeId!=${timeId} or startDate!="${startDate}" or endDate!="${endDate}"));
        `
    );
    
    const studentId = classBody.studentId;
    if (studentId!=0) {
        resultStudent = await db.query(
            `
            INSERT INTO studentsPerClass
            (classId, studentId)
            SELECT * FROM(SELECT ${id} AS cId, ${studentId} AS sId) AS tmp
            WHERE NOT EXISTS(
                SELECT studentId FROM studentsPerClass WHERE(studentId = ${studentId} and classId = ${id})
            ) LIMIT 1;
            `);        
    };

    const teacherId = classBody.teacherId;
    const teacherRoleId = classBody.teacherRoleId;

    if ((teacherId!=0) & (teacherRoleId!=0)) {        
        resultTeacher = await db.query(
            `
            INSERT INTO teachersPerClass
            (classId, teacherId, teacherRoleId)
            SELECT * FROM(SELECT ${id} AS cId, ${teacherId} AS tId, ${teacherRoleId} AS tcID) AS tmp
            WHERE NOT EXISTS (
                SELECT teacherId FROM teachersPerClass WHERE(teacherId = ${teacherId} and classId = ${id})
            ) LIMIT 1;
            `);
    };

    if (result.changedRows | resultStudent.affectedRows | resultTeacher.affectedRows) {
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