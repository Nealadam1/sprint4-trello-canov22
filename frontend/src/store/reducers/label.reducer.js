// import { boardService } from "../../services/board.service"

export const SET_LABELS = "SET_LABELS"
export const ADD_LABEL = "ADD_LABEL"



const initialState = {
    labels: [],
    label: null
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

        default:
    }
    return newState
}
