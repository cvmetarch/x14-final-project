import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./page/admin";
import Home from "./page/home";
import Courses from "./page/courses";
import ClassRoom from "./page/class";
import Facility from "./page/facility";
import Student from "./page/student";
import Teacher from "./page/teacher";

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />}>
                        <Route path="/admin/course" element={<Courses />} />
                        <Route path="/admin/class" element={<ClassRoom />} />
                        <Route path="/admin/student" element={<Student />} />
                        <Route path="/admin/teacher" element={<Teacher />} />
                        <Route path="/admin/facility" element={<Facility />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}