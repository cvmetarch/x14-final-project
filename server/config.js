const dotenv = require('dotenv');

dotenv.config();

mysql_uri = process.env.MYSQL_URI;
db_user = process.env.DB_USER;
db_password = process.env.DB_PASSWORD;
db_name = process.env.DB_NAME;

const config = {
    db: {
        host: mysql_uri,
        user: db_user,
        password: db_password,
        database: db_name,
    },
    listPerPage: 50,
};

module.exports = config;