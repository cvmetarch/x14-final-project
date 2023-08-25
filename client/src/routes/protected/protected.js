import Teachers from "../../page/teachers";
import Students from "../../page/students";
import Facilities from "../../page/facilities";
import Classes from "../../page/classes";
import StudentRegisterCourses from "../../page/studentRegisterCourse";


export const protectedRoutes = [
    {
        id: 1,
        path: "/admin/teachers",
        element: Teachers,
    },
    {
        id: 2,
        path: "/admin/students",
        element: Students,
    },
    {
        id: 3,
        path: "/admin/student-register-courses",
        element: StudentRegisterCourses,
    },
    {
        id: 4,
        path: "/admin/classes",
        element: Classes,
    },
    {
        id: 5,
        path: "/admin/facilities",
        element: Facilities
    }
];