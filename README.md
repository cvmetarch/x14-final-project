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

-------------------------
Done.
