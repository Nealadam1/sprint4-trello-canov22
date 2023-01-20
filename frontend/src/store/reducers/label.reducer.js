// import { boardService } from "../../services/board.service"

export const SET_LABELS = "SET_LABELS"


const initialState = {
    labels: []
}

export function labelReducer(state = initialState, action) {
    var newState = state
    var labels
    switch (action.type) {
        case SET_LABELS:
            newState = { ...state, labels: action.labels }
            break
        default:
    }
    return newState
}
