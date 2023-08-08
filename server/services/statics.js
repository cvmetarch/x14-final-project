const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCourseList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM courses LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getCourse(id) {
    const rows = await db.query(
        `SELECT *
    FROM courses
    WHERE courseId=${id}`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function createCourse(newCourse) {    
    const result = await db.query(
        `
        INSERT INTO courses
        (courseId, categoryId, courseName, courseDescription)
        VALUES
        ((SELECT MAX(courseId) + 1 FROM courses c), ${newCourse.categoryId}, "${newCourse.name}", "${newCourse.description}");
        `
    );
    let message = 'Error while adding new course';
    if (result.affectedRows) {
        message = 'Course added successfully';
    }
    return {message};
    
}

async function getCategoryList(page = 1) {   
    const rows = await db.query(
        `SELECT *
    FROM categories`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getFacilityList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM facilities LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getLessonList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM lessons LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getLearningTimeList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM learningtimes LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

module.exports = {
    getCourseList,
    getCourse,
    createCourse,
    getCategoryList,
    getFacilityList,
    getLessonList,
    getLearningTimeList,
}