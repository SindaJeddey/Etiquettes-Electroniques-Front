import * as actionTypes from '../actions/actionTypes';

const initialState ={
    emailAddress: null,
    token: null,
    resetEmailSent: false
}

const Reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.SET_EMAIL:
            return{
                ...state,
                emailAddress: action.email
            }
            break;
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
            break;
        default:
            return state;
            break;
    }
}

export default Reducer;