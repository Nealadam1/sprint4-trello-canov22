


const initialState = {
    isActionModal: false
}
export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'MODAL_OPEN':
            return { ...state, isActionModal: true }
        case 'MODAL_CLOSE':
            return { ...state, isActionModal: false }
        default: return state
    }
}