import * as actionTypes from "../actions/actionTypes";

const initialState = {
    choice: "",
    element: null
}

const Reducer = (state = initialState,action) => {
    switch (action.type) {
        case (actionTypes.SET_CHOICE):
            return{
                ...state,
                choice: action.choice
            }
            break;

        default:
            return state;
    }
}

export default Reducer;