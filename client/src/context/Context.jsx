import { createContext, useReducer } from "react";
import axiosConfig from "../config/axiosConfig";
import reducer from "./reducer";

const initalState = {
    students: [],
    teachers: [],
    courses: [],
    facilities: [],
    learningTimes: [],
    categories: [],
    loading: false,
    isModal: false,
    isAlert: false,
    message: "",
    selectedCourse: "",
};

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);

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
        try {
            const { data } = await axiosConfig.post("/register", formData);
            dispatch({ type: "SUBMIT_SUCCESS", payload: data.message });
        } catch (error) {
            console.log(error);
            dispatch({ type: "SUBMIT_FAIL" });
        }
    }

    const login = async (formData) => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.post("/login", formData);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllStudents = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/student/all");
            dispatch({ type: "GET_ALL_STUDENTS", payload: data.data });
        } catch (error) {
            console.log(error);
        }
    }

    const getAllTeachers = async () => {
        dispatch({ type: "LOADING" });
        try {
            const { data } = await axiosConfig.get("/teacher/all");
            dispatch({ type: "GET_ALL_TEACHERS", payload: data.data });
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
                getAllStudents,
                getAllTeachers,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

