import {LOGIN, LOGOUT, SET_STORE, UPDATE_PASSWORD, UPDATE_USERNAME} from "./actionTypes";

export const login = (credentials) => {
    return{
        type: LOGIN,
        username:  credentials.username,
        authority: credentials.authority
    }
}

export const logout = () => {
    return{
        type: LOGOUT
    }
}

export const updateUsername = (username) => {
    return{
        type: UPDATE_USERNAME,
        username: username
    }
}

export const updatePassword = (password) => {
    return{
        type: UPDATE_PASSWORD,
        password: password
    }
}

export const setStore = (store) => {
    return{
        type: SET_STORE,
        store: store
    }
}