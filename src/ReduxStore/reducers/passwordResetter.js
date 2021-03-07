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
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

export default Reducer;
