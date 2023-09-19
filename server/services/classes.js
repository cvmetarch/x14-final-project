const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const dotenv = require('dotenv');

dotenv.config();
const SibApiV3Sdk = require('sib-api-v3-sdk');

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
    // `
    //     SELECT c.classId, c.courseId, co.courseName, c.className, c.learningTimeId, CONCAT(left(l.startTime,5),'-',left(l.endTime,5),' ',l.weekDay) as lTime, s.studentId, t.teacherId, t.teacherRoleId, c.startDate, c.endDate
    //     FROM classes c
    //     inner JOIN studentsperclass s ON (c.classId=${id} AND s.classId=${id})
    //     inner JOIN teachersperclass t ON (c.classId=${id} AND t.classId=${id})
    //     inner JOIN courses co on (c.courseId=co.courseId)
    //     inner JOIN learningtimes l ON c.learningTimeId=l.learningTimeId
    //     WHERE (t.teacherRoleId=1);
    // `
    const stuRows = await db.query(
    `
    SELECT DISTINCT s.studentId, stu.studentName
    FROM studentsperclass s
    inner JOIN students stu ON ((stu.studentId = s.studentId) AND (s.classId= ${ id }));
    `);

    const teaRows = await db.query(
    `
    SELECT DISTINCT t.teacherId, tea.teacherName, t.teacherRoleId, r.teacherRoleDescription
    FROM teachersperclass t
    inner JOIN teachers tea ON ((tea.teacherId = t.teacherId) AND (t.classId = ${ id }))
    inner JOIN teacherroles r ON (r.teacherRoleId = t.teacherRoleId);
    `);

    const data = [ helper.emptyOrRows(stuRows), helper.emptyOrRows(teaRows) ];

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
function sendNotification(className, courseName, learningTime, startDate, endDate, name, email, typeOfNoti, isTeacher){
    // send email
    //0 new class 1 changed class
    const emailSubject = ['Thông tin lớp học', 'Cập nhật thông tin lớp học'];
    const greetings = ['Chào mừng bạn đến với lớp học', 'Lớp'];
    const classInfo = ['', ' có thay đổi như sau'];
    const additionalInfo = ['', 'Bạn sẽ là người đồng hành cùng lớp với vai trò'];
    const roleName = ['', 'Giảng viên', 'Trợ giảng'];
    const sDate = new Date(startDate).toLocaleDateString('en-GB');
    const eDate = new Date(endDate).toLocaleDateString('en-GB');
    // console.log(sDate,eDate);
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_KEY;
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        'subject': emailSubject[typeOfNoti],
        'sender': { 'email': process.env.EMAIL_FROM, 'name': '[X14] Quản lý đào tạo' },
        'replyTo': { 'email': 'api@sendinblue.com', 'name': 'Sendinblue' },
        'to': [{ 'name': name, 'email': email }],
        'htmlContent':
            `
                    <html>
                    <body>
                        <p>Xin chào <b>${name}</b></p>
                        <h2>${greetings[typeOfNoti]} <span style="color:red;"> ${className} của khóa ${courseName} </span></h2>
                        <p>Thông tin về lớp học${classInfo[typeOfNoti]}:</p>
                        <p>${additionalInfo[(isTeacher>0)?1:0]} <b>${roleName[isTeacher]}</b></p>
                        <p>Thời gian học: ${learningTime} <br>
                        Ngày khai giảng: ${sDate} <br>
                        Ngày dự kiến kết thúc: ${eDate} <hr>
                        Truy cập <a href="${process.env.CLIENT_URL}">trang chủ</a> để xem thông tin chi tiết!</p>
                        <hr>
                        <p>Trân trọng! </p><br>
                        <p>{{params.bodyMessage}}</p>
                    </body>
                    </html>
                    `,
        'params': {
            'bodyMessage': 'Học viện công nghệ MindX.'
        }
    }
    ).then(function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });

}
async function updateClass(id, classBody) {
    const courseId = classBody.courseId;
    const className = classBody.name;
    const timeId = classBody.timeId;
    const startDate = classBody.startDate;
    const endDate = classBody.endDate;

    let message = 'Cập nhật không thành công!';
    let resultStudent;
    let resultTeacher=false;

    const courseName = await db.query(
        `
            SELECT courseName
            FROM courses WHERE courseId=${courseId}
        `);
    const learnTime = await db.query(
        `
            SELECT CONCAT(left(startTime,5),'-',left(endTime,5),' ',weekDay) as lTime
            FROM learningtimes
            WHERE learningTimeId=${timeId}
        `);

    const result = await db.query(
        `
        UPDATE classes
        SET courseId=${courseId}, className="${className}", learningTimeId=${timeId}, startDate="${startDate}", endDate="${endDate}"
        WHERE (classId=${id} and (courseId!=${courseId} or className!="${className}" or learningTimeId!=${timeId} or startDate!="${startDate}" or endDate!="${endDate}"));
        `
    );

    // if (result.changedRows) {
    //     message = 'Cập nhật thông tin lớp học thành công!';
    // }

    const studentId = classBody.studentId;

    if (studentId!=null) {
        const addStu = (await db.query(
            `select * from studentsperclass where (classId = ${id} AND studentId = ${studentId})`)).length ? false: true;

        if (addStu) {
            resultStudent = await db.query(`INSERT INTO studentsPerClass (classId, studentId) VALUES (${id}, ${studentId})`);

            const receiverInfo = await db.query(
                `
                SELECT studentName, studentEmail
                FROM students WHERE studentId=${studentId};
                `);
            const name = receiverInfo[0].studentName;
            const email = receiverInfo[0].studentEmail;
            sendNotification(className, courseName[0].courseName, learnTime[0].lTime, startDate, endDate, name, email, 0, 0);
        }
    };

    const teacherId = classBody.teacherId;
    const teacherRoleId = classBody.teacherRoleId;

    if ((teacherId!=null) & (teacherRoleId!=null)) {
        resultStudent = true;
        const addTea = (await db.query(
            `select * from teachersperclass where (classId = ${id} AND teacherId = ${teacherId})`)).length ? false : true;

        if (addTea) {
            let resTeacher = await db.query(
                `
                INSERT INTO teachersPerClass (classId, teacherId, teacherRoleId) VALUES (${id}, ${teacherId}, ${teacherRoleId})
                `);
            const receiverInfo = await db.query(
                `
                    SELECT teacherName, teacherEmail
                    FROM teachers WHERE teacherId=${teacherId};
                    `);
            const name = receiverInfo[0].teacherName;
            const email = receiverInfo[0].teacherEmail;
            sendNotification(className, courseName[0].courseName, learnTime[0].lTime, startDate, endDate, name, email, 0, teacherRoleId);
        } else {
            let resTeacher = await db.query(
                `
                UPDATE teachersPerClass SET teacherRoleId=${teacherRoleId}
                WHERE (classId=${id} AND teacherId = ${teacherId} AND teacherRoleId != ${teacherRoleId});
                `);
            if (resTeacher.affectedRows) {
                const receiverInfo = await db.query(
                    `
                        SELECT teacherName, teacherEmail
                        FROM teachers WHERE teacherId=${teacherId};
                        `);
                const name = receiverInfo[0].teacherName;
                const email = receiverInfo[0].teacherEmail;
                sendNotification(className, courseName[0].courseName, learnTime[0].lTime, startDate, endDate, name, email, 1, teacherRoleId);
            }
        };
    };

    if ((result.changedRows>0) | (resultStudent) | (resultTeacher)) {
        message = 'Cập nhật thông tin lớp học thành công!';
        if (result.changedRows>0){
            const stuRows = await db.query(
                `
                SELECT DISTINCT stu.studentName, stu.studentEmail
                FROM studentsperclass s
                inner JOIN students stu ON ((stu.studentId = s.studentId) AND (s.classId= ${id}));
                `);

            for (let i in stuRows) {
                sendNotification(className, courseName[0].courseName, learnTime[0].lTime, startDate, endDate, stuRows[i].studentName, stuRows[i].studentEmail, 1, 0);
            }
            const teaRows = await db.query(
                `
                SELECT DISTINCT tea.teacherName, tea.teacherEmail, t.teacherRoleId
                FROM teachersperclass t
                inner JOIN teachers tea ON ((tea.teacherId = t.teacherId) AND (t.classId = ${id}));
                `);

            for (let i in teaRows) {
                sendNotification(className, courseName[0].courseName, learnTime[0].lTime, startDate, endDate, teaRows[i].teacherName, teaRows[i].teacherEmail, 1, 0);
            }
        }
    }
    return { message };
}

async function removeStudentFromClass(id, stuId) {
    const result = await db.query(
        `DELETE FROM studentsPerClass WHERE (classId=${id} AND studentId=${stuId})`
    );

    let message = 'Xoá học viên không thành công!';

    if (result.affectedRows) {
        message = 'Xoá học viên thành công!';
    }

    return { message };
}

async function removeTeacherFromClass(id, teaId) {
    const result = await db.query(
        `DELETE FROM teachersPerClass WHERE (classId=${id} AND teacherId=${teaId})`
    );

    let message = 'Xoá giảng viên không thành công!';

    if (result.affectedRows) {
        message = 'Xoá giảng viên thành công!';
    }

    return { message };
}

async function removeClass(id) {
    let r1 = await db.query(
        `
        DELETE FROM teachersPerClass WHERE (classId=${id});
        `);
    let r2 = await db.query(
        `
        DELETE FROM studentsPerClass WHERE (classId=${id});
        `);
    const result = await db.query(
        `
        DELETE FROM classes WHERE classId=${id};
        `
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
    removeStudentFromClass,
    removeTeacherFromClass,
    removeClass
}