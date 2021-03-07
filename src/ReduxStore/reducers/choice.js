import * as actionTypes from "../actions/actionTypes";

const initialState = {
    choice: "",
    elementId: null,
    items: null
}

const Reducer = (state = initialState,action) => {
    switch (action.type) {
        case (actionTypes.SET_CHOICE):
            return{
                ...state,
                choice: action.choice
            }
        case (actionTypes.SET_ELEMENT):
            return {
                ...state,
                elementId: action.elementId
            }
        case (actionTypes.SET_ITEMS):
            return {
                ...state,
                items: action.items
            }
        default:
            return state;
    }
}

export default Reducer;
