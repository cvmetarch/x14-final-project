const express = require('express');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};



const authRoutes = require('./routes/auth');
const admins = require('./routes/admins');
const teachers = require('./routes/teachers');
const students = require('./routes/students');
const registers = require('./routes/registers');
const courses = require('./routes/courses');
const categories = require('./routes/categories');
const facilities = require('./routes/facilities');
const lessons = require('./routes/lessons');
const learningtimes = require('./routes/learningtimes');

const classes = require('./routes/classes');

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({message: "OK"});
});

app.use('/student', students);
app.use('/register', registers);

app.use('/courses', courses);
app.use('/categories', categories);
app.use('/facilities', facilities);
app.use('/lessons', lessons);
app.use('/learningtimes', learningtimes);

app.use('/admin', admins);
app.use('/teacher', teachers);
app.use('/login', authRoutes);

app.use('/class', classes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});