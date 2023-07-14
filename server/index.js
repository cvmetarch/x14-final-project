const express = require('express');
const students = require('./routes/students');
// const dotenv = require('dotenv');
// const mysql = require('mysql2');

// dotenv.config();

// mysql_uri = process.env.MYSQL_URI;
// db_user = process.env.DB_USER;
// db_password = process.env.DB_PASSWORD;
// db_name = process.env.DB_NAME;

// const connection = mysql.createConnection({
//     host: mysql_uri,
//     user: db_user,
//     password: db_password,
//     database: db_name
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected!');
// });

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({message: "OK"});
});

app.use('/students', students);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
});

// app.get('/students', (req, res) => {
//     res.json({
//         data:"Ryan Zen David",
//     });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});