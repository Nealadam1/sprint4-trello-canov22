export const CARD_DETAIL_OPEN = "CARD_DETAIL_OPEN"
export const CARD_DETAIL_CLOSE = "CARD_DETAIL_CLOSE"

const initialState = {
  isActionModal: false,
  cardDetailModal: false,
}
export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case "MODAL_OPEN":
      return { ...state, isActionModal: action.modalType }
    case "MODAL_CLOSE":
      return { ...state, isActionModal: false }
    default:
      return state
    case "CARD_DETAIL_OPEN":
      return { ...state, cardDetailModal: true }
    case "CARD_DETAIL_CLOSE":
      return { ...state, cardDetailModal: false }
  }
}
