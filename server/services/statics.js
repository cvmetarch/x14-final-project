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

async function getCategoryList(page = 1) {   
    const rows = await db.query(
        `SELECT *
    FROM courses`
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
    getCategoryList,
    getFacilityList,
    getLessonList,
    getLearningTimeList,
}