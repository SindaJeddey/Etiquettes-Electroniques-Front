import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username:null,
    password:null,
    token: null,
    authority: null,
    store:null
}

const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.LOGIN):
            return{
                ...state,
                username: action.username,
                password: action.password,
                token: action.token,
                authority: action.authority
            }
            break;

        case (actionTypes.LOGOUT):
            return{
                ...state,
                token: null,
                authority: null,
                username: null,
                password: null
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

        case (actionTypes.SET_STORE):
            return {
                ...state,
                store: action.store
            }
            break;
    }
    return state;
};

export default Reducer;