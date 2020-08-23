import {SET_CHOICE, SET_ELEMENT, SET_ITEMS} from "./actionTypes";

export const setChoice = (choice) => {
    return{
        type: SET_CHOICE,
        choice: choice
    }
}

export const setElement = (elementId) => {
    return{
        type: SET_ELEMENT,
        elementId: elementId
    }
}

export const setItems = (items) => {
    return{
        type: SET_ITEMS,
        items: items
    }
}