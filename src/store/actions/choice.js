import {SET_CHOICE} from "./actionTypes";

export const setChoice = (choice) => {
    return{
        type: SET_CHOICE,
        choice: choice
    }
}