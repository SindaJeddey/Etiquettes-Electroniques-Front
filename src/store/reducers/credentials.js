import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username:"",
    password:"",
    token: ""
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.LOGIN):
            return{
                ...state,
                username: action.username,
                password: action.password,
                token: action.token
            }
            break;

        case (actionTypes.UPDATE_USERNAME):
            return {
                ...state,
                username: action.username
            }
            break;

        case (actionTypes.UPDATE_PASSWORD):
            return {
                ...state,
                password: action.password
            }
            break;
    }
    return state;
};

export default Reducer;