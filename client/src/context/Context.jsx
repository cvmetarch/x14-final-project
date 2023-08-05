import { createContext, useReducer } from "react";
import axios from "../config/axiosConfig";
import reducer from "./reducer";

const initalState = {
    courses: [],
    facilities: [],
    learningTimes: [],
    categories: [],
    loading: false,
};

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);

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
            console.log(response);
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

