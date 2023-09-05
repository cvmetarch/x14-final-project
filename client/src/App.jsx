import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Admin from "./page/admin";
import Home from "./page/home";
import Teachers from "./page/teachers";
import Students from "./page/students";
import Facilities from "./page/facilities";
import Classes from "./page/classes";
import AdminCourseLists from "./page/courseList";
import StudentRegisterCourses from "./page/studentRegisterCourse";

export default function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />}>
                    <Route path="/admin/teachers" element={<Teachers />} />
                    <Route path="/admin/students" element={<Students />} />
                    <Route path="/admin/facilities" element={<Facilities />} />
                    <Route path="/admin/classes" element={<Classes />} />
                    <Route path="/admin/courses-list" element={<AdminCourseLists />}>
                        <Route path="/admin/courses-list/X-Career" element={<StudentRegisterCourses courseId={1} courseName="X-Career" />} />
                        <Route path="/admin/courses-list/CS-Course" element={<StudentRegisterCourses courseId={2} courseName="CS Course" />} />
                        <Route path="/admin/courses-list/Data-Analyst" element={<StudentRegisterCourses courseId={3} courseName="Data Analyst" />} />
                        <Route path="/admin/courses-list/Blockchain" element={<StudentRegisterCourses courseId={4} courseName="Blockchain" />} />
                        <Route path="/admin/courses-list/IT-BI/BA" element={<StudentRegisterCourses courseId={5} courseName="IT BI/BA" />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer autoClose={3000} />
        </div>
    );
}