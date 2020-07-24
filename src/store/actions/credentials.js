import {LOGIN, LOGOUT, UPDATE_PASSWORD, UPDATE_USERNAME} from "./actionTypes";

export const login = (credentials) => {
    return{
        type: LOGIN,
        username:  credentials.username,
        password:  credentials.password,
        token: credentials.token,
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