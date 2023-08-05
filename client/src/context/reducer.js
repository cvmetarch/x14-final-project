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
        case "LOADING": 
            return {
                ...state,
                loading: true
            };
        default:
            return new Error("Invalid action");
    }
}