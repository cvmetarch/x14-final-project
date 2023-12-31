# x14-final-project
Demo he thong quan ly dao tao

Setup for Server:
1.Open terminal in 'server' folder
2.Install modules: npm i
3.Run: npm start

Create Database:
1.Cài MySQL server 8.0, để mặc định và next, lưu ý ghi nhớ root password để connect database.
2.Cài Navicat để dễ query và quan sát database
3.Vào Navicat, New Connection-MySQL, đặt Connection Name tùy ý, các field khác để mặc định, nhập root password ở trên vào ô Password, OK.
4.Chọn Connection vừa tạo, bấm Query, chọn New Query, copy đoạn này vào:
CREATE DATABASE x14project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE x14project;

CREATE TABLE facilities (
	facilityId INT(10) PRIMARY KEY,
	facilityName VARCHAR(50),
	facilityDescription VARCHAR(200)
);

CREATE TABLE rooms (
	roomId INT(10) PRIMARY KEY,
	roomNumber INT(10)
);

CREATE TABLE categories (
	categoryId INT(10) PRIMARY KEY,
	categoryName VARCHAR(50),
	categoryDescription VARCHAR(200)
);

CREATE TABLE courses (
	courseId INT(10) PRIMARY KEY,
	categoryId INT(10),
	courseName VARCHAR(50),
	courseDescription VARCHAR(200),
	FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE students (
	studentId INT(10) PRIMARY KEY,
	studentName VARCHAR(50),
	studentEmail VARCHAR(50),
	studentPhone VARCHAR(20),
	studentDob DATETIME,
	studentGuardianName VARCHAR(50),
	studentGuardianPhone VARCHAR(20),
	studentGuardianRelative VARCHAR(20)
);

CREATE TABLE registerCourseStatuses (
	registerCourseStatusId INT(10) PRIMARY KEY,
	registerCourseStatusDescription VARCHAR(200)
);

CREATE TABLE registers (
	id INT(10) PRIMARY KEY,
	courseId INT(10),
	facilityId INT(10),
	registerCourseStatusId INT(10),
	studentId INT(10),
	registerDate DATETIME,
	cancellationReason VARCHAR(200),
	FOREIGN KEY (courseId) REFERENCES courses(courseId),
	FOREIGN KEY (facilityId) REFERENCES facilities(facilityId),
	FOREIGN KEY (registerCourseStatusId) REFERENCES registerCourseStatuses(registerCourseStatusId),
	FOREIGN KEY (studentId) REFERENCES students(studentId)
);

CREATE TABLE lessons (
	lessonId INT(10) PRIMARY KEY,
	courseId INT(10),	
	lessonName VARCHAR(50),
	lessonDocuments VARCHAR(200),
	FOREIGN KEY (courseId) REFERENCES courses(courseId)
);

CREATE TABLE learningTimes (
	learningTimeId INT(10) PRIMARY KEY,
	startTime TIME,
	endTime TIME
);

CREATE TABLE classes (
	classId INT(10) PRIMARY KEY,
	lessonId INT(10),
	learningTimeId INT(10),
	className VARCHAR(50),
	startDate DATETIME,
	endDate DATETIME,
	FOREIGN KEY (lessonId) REFERENCES lessons(lessonId),
	FOREIGN KEY (learningTimeId) REFERENCES learningTimes(learningTimeId)
);

CREATE TABLE attendances (
	id INT(10) PRIMARY KEY,
	studentId INT(10),
	classId INT(10),
	score INT(10),
	timeArrive TIME,
	timeLeave TIME,
	FOREIGN KEY (studentId) REFERENCES students(studentId),
	FOREIGN KEY (classId) REFERENCES classes(classId)
);

CREATE TABLE feedbacksPerClass (
	id INT(10) PRIMARY KEY,
	studentId INT(10),
	classId INT(10),
	feedbackClassRate INT(10),
	feedbackTeacherRate INT(10),
	feedbackDescription VARCHAR(200),
	FOREIGN KEY (studentId) REFERENCES students(studentId),
	FOREIGN KEY (classId) REFERENCES classes(classId)
);

CREATE TABLE teacherRoles (
	teacherRoleId INT(10) PRIMARY KEY,
	teacherRoleDescription VARCHAR(200)
);

CREATE TABLE teachers (
	teacherId INT(10) PRIMARY KEY,
	teacherRoleId INT(10),
	teacherName VARCHAR(50),
	teacherEmail VARCHAR(50),
	teacherPhone VARCHAR(20),
	teacherUsername VARCHAR(50),
	teacherPassword VARCHAR(20),
	FOREIGN KEY (teacherRoleId) REFERENCES teacherRoles(teacherRoleId)
);

CREATE TABLE teachersPerClass (
	id INT(10) PRIMARY KEY,
	classId INT(10),
	teacherId INT(10),
	FOREIGN KEY (classId) REFERENCES classes(classId),
	FOREIGN KEY (teacherId) REFERENCES teachers(teacherId)
);

CREATE TABLE roomsInFacility (
	id INT(10) PRIMARY KEY,
	facilityId INT(10),
	roomId INT(10),
	FOREIGN KEY (facilityId) REFERENCES facilities(facilityId),
	FOREIGN KEY (roomId) REFERENCES rooms(roomId)
);

CREATE TABLE classesInRoom (
	id INT(10) PRIMARY KEY,	
	roomId INT(10),
	classId INT(10),	
	FOREIGN KEY (roomId) REFERENCES rooms(roomId),
	FOREIGN KEY (classId) REFERENCES classes(classId)
);

INSERT INTO students (studentId, studentName, studentEmail, studentPhone, studentDob) VALUES (1, 'Võ Hữu Minh Chánh', 'chanhvokts@gmail.com', '0984320841', '1985-07-31 12:00:00');

INSERT INTO categories (categoryId, categoryName, categoryDescription) VALUES (1, 'Lập trình Web', 'Học cách sử dụng cả kỹ thuật và ý tưởng thiết kế trong lập trình Web');
INSERT INTO categories (categoryId, categoryName, categoryDescription) VALUES (2, 'Kỹ thuật phần mềm', 'Thiết kế, phân tích và bảo trì phần mềm');
INSERT INTO categories (categoryId, categoryName, categoryDescription) VALUES (3, 'Khoa học thông tin', 'Toàn cảnh về chuyển hóa thông tin, cách thức tương tác, sử dụng, mua bán thông tin');
INSERT INTO categories (categoryId, categoryName, categoryDescription) VALUES (4, 'Khoa học máy tính', 'Nghiên cứu về lập trình, lý thuyết và thiết kế của phần mềm');
INSERT INTO categories (categoryId, categoryName, categoryDescription) VALUES (5, 'Quản trị CSDL', 'Xây dựng CSDL và nghiên cứu tổ chức, lưu trữ, truy xuất lượng lớn thông tin');

INSERT INTO learningtimes (learningTimeId, startTime, endTime) VALUES (1, '9:15:00', '12:15:00');
INSERT INTO learningtimes (learningTimeId, startTime, endTime) VALUES (2, '14:15:00', '17:15:00');
INSERT INTO learningtimes (learningTimeId, startTime, endTime) VALUES (3, '19:15:00', '22:15:00');

INSERT INTO facilities (facilityId, facilityName, facilityDescription) VALUES (0, 'Online', 'Học online');
INSERT INTO facilities (facilityId, facilityName, facilityDescription) VALUES (1, 'HN-NCT', '71 Nguyễn Chí Thanh, Đống Đa, Hà Nội');
INSERT INTO facilities (facilityId, facilityName, facilityDescription) VALUES (2, 'HN-TC', '22C Thành Công, Ba Đình, Hà Nội');
INSERT INTO facilities (facilityId, facilityName, facilityDescription) VALUES (3, 'HCM-PMH', '490 Phạm Thái Bường - KĐT Phú Mỹ Hưng, Q. 7, TP HCM');
INSERT INTO facilities (facilityId, facilityName, facilityDescription) VALUES (4, 'HCM-PXL', '261-263 Phan Xích Long, Q. Phú Nhuận, TP HCM');

INSERT INTO courses (courseId, categoryId, courseName, courseDescription) VALUES (1, 1, 'X-Career', 'Lập trình Website');
INSERT INTO courses (courseId, categoryId, courseName, courseDescription) VALUES (2, 4, 'CS Course', 'Nhập môn khoa học máy tính');
INSERT INTO courses (courseId, categoryId, courseName, courseDescription) VALUES (3, 3, 'Data Analyst', 'Phân tích dữ liệu');
INSERT INTO courses (courseId, categoryId, courseName, courseDescription) VALUES (4, 2, 'Blockchain', 'Lập trình Blockchain');
INSERT INTO courses (courseId, categoryId, courseName, courseDescription) VALUES (5, 3, 'IT BI/BA', 'Business Intelligence/Business Analyst');

INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (1, 1, 'Lesson 1: Orientation Day', 'https://mindxschool.notion.site/Lesson-1-Orientation-Day-e52aaab8067b490e9f48d86e3e947ffb?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (2, 1, 'Lesson 2: Orientation Day', 'https://mindxschool.notion.site/Lesson-1-Orientation-Day-e52aaab8067b490e9f48d86e3e947ffb?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (3, 1, 'Lesson 3: Introduction to React', 'https://mindxschool.notion.site/Lesson-3-Introduction-to-React-59aad5ca77de48d3a9e4f552197b4318?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (4, 1, 'Lesson 4: JSX & Props', 'https://mindxschool.notion.site/Lesson-4-JSX-Props-5e8467dee3ef4cfc994bb5e709af9534?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (5, 1, 'Lesson 5: State & Events', 'https://mindxschool.notion.site/Lesson-5-State-Events-e8eebc41e6704262a0ff5b9cef8e49e3?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (6, 1, 'Lesson 6: More about State & Props', 'https://mindxschool.notion.site/Lesson-6-More-about-State-Props-44d9dda7e029437da565ea7b080b84d0?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (7, 1, 'Lesson 7: List & conditional rendering', 'https://mindxschool.notion.site/Lesson-7-List-conditional-rendering-d266127822624de0baa6959c76ecca43?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (8, 1, 'Lesson 8: Side effect with useEffect', 'https://mindxschool.notion.site/Lesson-8-Side-effect-with-useEffect-4ce9b6362eab4ac0b365444c2064219f?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (9, 1, 'Lesson 9: Context', 'https://mindxschool.notion.site/Lesson-9-Context-8f3f02e45a3d46a8aeec3940d760eec4?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (10, 1, 'Lesson 10: Routing', 'https://mindxschool.notion.site/Lesson-10-Routing-7aed01eb887446a0b2d9b9ea8164a1cf?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (11, 1, 'Lesson 11: HTTP', 'https://mindxschool.notion.site/Lesson-11-HTTP-397720583c0943e2b33ef1c1abac4f88?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (12, 1, 'Lesson 12: Other React hooks', 'https://mindxschool.notion.site/Lesson-12-Other-React-hooks-08e33750f05e4854becbcee7e6f6dfa9?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (13, 1, 'Lesson 13: Creating your own hooks', 'https://mindxschool.notion.site/Lesson-13-Creating-your-own-hooks-726a145c89d840f8b611685d5ae2bf6a?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (14, 1, 'Lesson 14: Class-based Components', 'https://mindxschool.notion.site/Lesson-14-Class-based-Components-668d3308c16d44df8f6e4e53567ca494?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (15, 1, 'Lesson 15: External Resources', 'https://mindxschool.notion.site/Lesson-15-External-Resources-5d21ef5da44d4b3e87461e7aa52836dc?pvs=25');
INSERT INTO lessons (lessonId, courseId, lessonName, lessonDocuments) VALUES (16, 1, 'Lesson 16: Deployment', 'https://mindxschool.notion.site/Lesson-16-Deployment-fbff444f240c4ac4ac23d95db1b8af44?pvs=25');

INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (17, 3, 'Lesson 1: Orientation Day');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (18, 3, 'Lesson 2: SQL - Tổng quan');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (19, 3, 'Lesson 3: SQL - Các câu lệnh cơ bản');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (20, 3, 'Lesson 4: SQL - Các hàm thông dụng');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (21, 3, 'Lesson 5: SQL - Import');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (22, 3, 'Lesson 6: SQL - Review, thực hành JOIN + CTE');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (23, 3, 'Lesson 7: SQL - Ôn tập CASE Statement');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (24, 3, 'Lesson 8: Power BI - Tổng quan');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (25, 3, 'Lesson 9: Power BI - Data Modeling và Relationship');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (26, 3, 'Lesson 10: Power BI - DAX, các nhóm DAX phổ biến');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (27, 3, 'Lesson 11: Python - Tổng quan');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (28, 3, 'Lesson 12: Python - Các lệnh cơ bản, Pandas');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (29, 3, 'Lesson 13: Python - Thao tác với file và database');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (30, 3, 'Lesson 14: Python - Thực hành và chữa bài tập');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (31, 3, 'Lesson 15: Demo Final Project');
INSERT INTO lessons (lessonId, courseId, lessonName) VALUES (32, 3, 'Lesson 16: Demo Final Project');

-------------
Done.
