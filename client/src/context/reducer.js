export default function reducer(state, action) {
    switch (action.type) {
        case "SET_COURSE":
            return {
                ...state,
                courses: action.payload,
            };
        case "SET_FACILITY":
            return {
                ...state,
                facilities: action.payload,
            };
        case "SET_LEARNING_TIME":
            return {
                ...state,
                learningTimes: action.payload,
            };
        case "SET_CATEGORY":
            return {
                ...state,
                categories: action.payload,
            };
        case "OPEN_MODAL":
            return {
                ...state,
                isModal: true,
                selectedCourse: action.payload,
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                isModal: false,
            }
        case "OPEN_ALERT":
            return {
                ...state,
                isAlert: true,
            }
        case "CLOSE_ALERT":
            return {
                ...state,
                isAlert: false,
            }
        case "SUBMIT_SUCCESS":
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case "SUBMIT_FAIL":
            return {
                ...state,
                loading: false,
            };
        case "LOADING":
            return {
                ...state,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                isModal: false,
                message: action.payload,
                username: action.payload.username,
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        case "LOG_OUT":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                isModal: false,
                username: ""
            }
        case "GET_COURSES":
            return {
                ...state,
                loading: false,
                courses: action.payload
            }
        case "GET_ALL_STUDENTS":
            return {
                ...state,
                loading: false,
                students: action.payload
            }

        case "GET_FACILITY_LIST":
            return {
                ...state,
                loading: false,
                facilityList: action.payload
            }

        case "GET_ALL_STUDENTS_REGISTRATION":
            return {
                ...state,
                loading: false,
                studentRegisters: action.payload
            }

        case "GET_ALL_TEACHERS":
            return {
                ...state,
                loading: false,
                teachers: action.payload
            }
        case "GET_CLASS_LIST":
            return {
                ...state,
                loading: false,
                classList: action.payload
            }
        case "GET_CLASS_DETAIL":
            return {
                ...state,
                classInfo: action.payload
            }
        case "GET_LEARNING_TIME":
            return {
                ...state,
                loading: false,
                learningTimes: action.payload
            }
        case "CREATE_CLASS_SUCCESS":
            return {
                ...state,
                loading: false,
            }
        default:
            return new Error("Invalid action");
    }
}