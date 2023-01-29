// import { boardService } from "../../services/board.service"

export const SET_LABELS = "SET_LABELS"
export const ADD_LABEL = "ADD_LABEL"
export const PUT_LABEL = "PUT_LABEL"
export const REMOVE_LABEL = "REMOVE_LABEL"
export const SET_LABEL_STATE = 'SET_LABEL_STATE'


const initialState = {
    labels: [],
    label: null,
    isOpen: true
}

export function labelReducer(state = initialState, action) {
    var newState = state
    var labels
    switch (action.type) {
        case SET_LABELS:
            newState = { ...state, labels: action.labels }
            break
        case ADD_LABEL:
            newState = { ...state, labels: [...state.labels, action.label] }
            break
        case SET_LABEL_STATE:
            newState = { ...state, isOpen: action.isOpen }
            break

        default:
    }
    return newState
}
