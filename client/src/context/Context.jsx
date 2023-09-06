import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosConfig from "../config/axiosConfig";
import reducer from "./reducer";

const initalState = {
    isAuthenticated: false,
    students: [],
    teachers: [],
    studentRegisters: [],
    classList: [],
    courses: [],
    facilities: [],
    learningTimes: [],
    categories: [],
    loading: false,
    isModal: false,
    isAlert: false,
    message: "",
    selectedCourse: "",
    username: "",
};

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);
    const navigate = useNavigate();

    // student page
    const openModal = (id) => dispatch({ type: "OPEN_MODAL", payload: id });
    const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

    const openAlert = () => dispatch({ type: "OPEN_ALERT" });
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: "CLOSE_ALERT" });
    };

    const getFormInfo = async () => {
        try {
            const data = await Promise.all([
                axiosConfig.get("/courses"),
                axiosConfig.get("/facilities"),
                axiosConfig.get("/learningtimes"),
                axiosConfig.get("/categories"),
            ]);
            dispatch({ type: "SET_COURSE", payload: data[0].data.data });
            dispatch({ type: "SET_FACILITY", payload: data[1].data.data });
            dispatch({ type: "SET_LEARNING_TIME", payload: data[2].data.data });
            dispatch({ type: "SET_CATEGORY", payload: data[3].data.data });

        } catch (error) {
            console.log(error);
        }
    }

    const submitForm = async (formData) => {
        dispatch({ type: "LOADING" });

        if (!formData.courseId) {
            formData.courseId = state.selectedCourse;
        }

        try {
            const { data } = await axiosConfig.post("/register", formData);
            dispatch({ type: "SUBMIT_SUCCESS", payload: data.message });
        } catch (error) {
            dispatch({ type: "SUBMIT_FAIL" });
        }
    }

    // Admin page
    const login = async (formData) => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.post("/login", formData);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data
            });
            toast.success("Đăng nhập thành công");
        } catch (error) {
            dispatch({ type: "LOGIN_FAIL" });
            toast.error("Đăng nhập thất bại");
        }
    }

    const logout = () => {
        dispatch({ type: "LOADING" });
        localStorage.clear();
        navigate("/admin");
        window.location.reload();
        dispatch({ type: "LOG_OUT" });
    }

    const getCourses = async () => {
        try {
            const { data } = await axiosConfig.get("/courses");
            dispatch({ type: "GET_COURSES", payload: data.data });
        } catch (error) {
            console.log(error);
        }
    }

    const getAllTeachers = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/teacher/all");
            dispatch({
                type: "GET_ALL_TEACHERS",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getAllStudents = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/student/all");
            dispatch({
                type: "GET_ALL_STUDENTS",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getFacilityList = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/facilities");
            dispatch({
                type: "GET_FACILITY_LIST",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getStudent = async (studentId) => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get(`/student/${studentId}`);
            dispatch({
                type: "GET_STUDENT",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const updateStudent = async (studentId, studentInfo) => {
        dispatch({ type: "LOADING" });
        try {
            await axiosConfig.put(`/student/${studentId}`, studentInfo);
            dispatch({ type: "UPDATE_STUDENT_SUCCESS" });
            toast.success("Cập nhật thông tin học viên thành công");
        } catch (error) {
            console.log(error);
            dispatch({ type: "UPDATE_STUDENT_FAIL" });
            toast.success("Cập nhật thông tin học viên thất bại");
        }
    }

    const deleteStudent = async (studentId) => {
        dispatch({ type: "LOADING" });
        try {
            await axiosConfig.delete(`/student/${studentId}`);
            dispatch({ type: "DELETE_STUDENT_SUCCESS" });
            toast.success("Xóa học viên thành công");
        } catch (error) {
            console.log(error);
            dispatch({ type: "DELETE_STUDENT_FAIL" });
            toast.error("Xóa học viên thất bại");
        }
    }

    const getStudentRegisterByCourse = async (courseId) => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get(`/admin/course/${courseId}`);
            dispatch({
                type: "GET_ALL_STUDENTS_REGISTRATION",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getClassList = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/class");
            dispatch({
                type: "GET_CLASS_LIST",
                payload: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    const createClass = async (classInfo) => {
        dispatch({ type: "LOADING" });
        try {
            await axiosConfig.post("/class/create", classInfo);
            dispatch({ type: "CREATE_CLASS_SUCCESS" });
            toast.success("Tạo lớp học thành công");
        } catch (error) {
            console.log(error);
            dispatch({ type: "CREATE_CLASS_FAIL" });
            toast.error("Tạo lớp học thất bại");
        }
    }

    const getLearningtimes = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/learningtimes");
            dispatch({ type: "GET_LEARNING_TIME", payload: data.data });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                getFormInfo,
                submitForm,
                openModal,
                closeModal,
                openAlert,
                closeAlert,
                login,
                logout,
                getCourses,
                getAllStudents,
                getAllTeachers,
                getFacilityList,
                getStudentRegisterByCourse,
                getClassList,
                getLearningtimes,
                createClass,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

