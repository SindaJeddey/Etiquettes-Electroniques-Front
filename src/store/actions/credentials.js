import {LOGIN, UPDATE_PASSWORD, UPDATE_USERNAME} from "./actionTypes";

export const login = ({username,password,token}) => {
    return{
        type: LOGIN,
        username: username,
        password: password,
        token:token
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