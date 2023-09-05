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
                        <Route path="/admin/courses-list/X-Career" element={<StudentRegisterCourses />} />
                        <Route path="/admin/courses-list/CS-Course" element={<StudentRegisterCourses />} />
                        <Route path="/admin/courses-list/Data-Analyst" element={<StudentRegisterCourses />} />
                        <Route path="/admin/courses-list/Blockchain" element={<StudentRegisterCourses />} />
                        <Route path="/admin/courses-list/IT-BI/BA" element={<StudentRegisterCourses />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer autoClose={3000} />
        </div>
    );
}