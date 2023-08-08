import { createContext, useReducer } from "react";
import axios from "../config/axiosConfig";
import reducer from "./reducer";

const initalState = {
    courses: [],
    facilities: [],
    learningTimes: [],
    categories: [],
    loading: false,
    isModal: false,
    isAlert: false,
    message: ""
};

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);

    const openModal = () => dispatch({ type: "OPEN_MODAL" });
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
                axios.get("/courses"),
                axios.get("/facilities"),
                axios.get("/learningtimes"),
                axios.get("/categories"),
            ]);
            dispatch({ type: "SET_COURSE", payload: data[0].data.data });
            dispatch({ type: "SET_FACILITY", payload: data[1].data.data });
            dispatch({ type: "SET_LEARNING_TIME", payload: data[2].data.data });
            dispatch({ type: "SET_CATEGORY", payload: data[3].data.data });

        } catch (error) {
            console.log(error);
        }
    }

    const submitForm = async (data) => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.post("/register", data);
            dispatch({ type: "SUBMIT_SUCCESS", payload: response.data.message });
        } catch (error) {
            console.log(error);
            dispatch({ type: "SUBMIT_FAIL" });
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

