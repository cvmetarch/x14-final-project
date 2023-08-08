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
        default:
            return new Error("Invalid action");
    }
}