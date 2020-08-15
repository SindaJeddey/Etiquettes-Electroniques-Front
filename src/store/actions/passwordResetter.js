import {SET_EMAIL, SET_TOKEN} from "./actionTypes";

export const setEmail = (email) => {
    return{
        type: SET_EMAIL,
        email: email
    }
}

export const setToken = (token) => {
    return{
        type: SET_TOKEN,
        token: token
    }
}