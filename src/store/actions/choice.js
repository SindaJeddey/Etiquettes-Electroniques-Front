import {SET_CHOICE, SET_ELEMENT, SET_ITEMS} from "./actionTypes";

export const setChoice = (choice) => {
    return{
        type: SET_CHOICE,
        choice: choice
    }
}

export const setElement = (element) => {
    return{
        type: SET_ELEMENT,
        element: element
    }
}

export const setItems = (items) => {
    return{
        type: SET_ITEMS,
        items: items
    }
}