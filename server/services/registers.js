const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const dotenv = require('dotenv');

dotenv.config();
const SibApiV3Sdk =require('sib-api-v3-sdk');


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
    let name = studentRegister.name;
    let email = studentRegister.email;
    let phone = studentRegister.phone;

    let message = 'Đăng ký khóa học không thành công!';

    if (name.length * email.length * phone.length == 0) {
        message = 'Vui lòng điền đầy đủ họ tên, địa chỉ email và số điện thoại!';
    } else {
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

        const courseName = await db.query(
            `
            SELECT courseName, courseDescription
            FROM courses WHERE courseId=${courseId}
            `);
        // console.log(courseName[0].courseName, courseName[0].courseDescription);

        if ((result.affectedRows) & (result2.affectedRows)) {
            message = 'Đăng ký khóa học thành công!';
            // send email
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_KEY;
            new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
                'subject': 'Thông tin đăng ký khoá học',
                'sender': { 'email': process.env.EMAIL_FROM, 'name': '[X14] Quản lý đào tạo' },
                'replyTo': { 'email': 'api@sendinblue.com', 'name': 'Sendinblue' },
                'to': [{ 'name': name, 'email': email }],
                'htmlContent':
                    `
                    <html>
                    <body>
                        <p>Xin chào <b>${name}</b></p>
                        <h2>Chào mừng bạn đến với khóa học <br> <span style="color:red;"> ${courseName[0].courseName} - ${courseName[0].courseDescription} </span></h2>
                        <p>Bộ phận quản lý lớp học sẽ liên hệ với bạn trong thời gian sớm nhất. Truy cập <a href="${process.env.CLIENT_URL}">trang chủ</a> để xem thông tin chi tiết!</p>
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
    }
    return { message };
}

async function updateRegister(id, studentRegister) {
    const result = await db.query(
        `UPDATE registers
    SET courseId=${studentRegister.courseId}, facilityId=${studentRegister.facilityId}, learningTimeId=${studentRegister.learningTimeId}, studentId=${studentRegister.studentId}, registerCourseStatusId=${studentRegister.registerCourseStatusId}, cancellationReason="${studentRegister.cancellationReason}"
    WHERE id=${id}`
    );

    let message = 'Không thể cập nhật thông tin đăng ký!';

    if (result.affectedRows) {
        message = 'Cập nhật thông tin đăng ký thành công!';
    }

    return { message };
}

async function removeRegister(id) {
    const result = await db.query(
        `DELETE FROM registers WHERE id=${id}`
    );

    let message = 'Không thể hủy đăng ký!';

    if (result.affectedRows) {
        message = 'Hủy đăng ký thành công!';
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