export const SET_LABELS = "SET_LABELS"

const initialState = {
  labels: [],
}

export function labelReducer(state = initialState, action) {
  var newState = state
  var labels
  switch (action.type) {
    case SET_LABELS:
      newState = { ...state, labels: action.labels }
      break
    // case REMOVE_LABEL:
    // //   const lastRemovedBoard = state.boards.find(
    // //     (board) => board._id === action.boardId
    // //   )
    //   labels = state.labels.filter((board) => board._id !== action.boardId)
    //   newState = { ...state, boards}
    //   break
    // case ADD_BOARD:
    //   newState = { ...state, boards: [...state.boards, action.board] }
    //   break
    // case UPDATE_BOARD:
    //   boards = state.boards.map((board) =>
    //     board._id === action.board._id ? action.board : board
    //   )
    //   newState = { ...state, boards }
    //   break
    // case SET_GROUP: {
    //   newState = { ...state, group: action.group }
    //   break
    // }
    // case UNDO_REMOVE_BOARD:
    //   if (state.lastRemovedBoard) {
    //     newState = {
    //       ...state,
    //       boards: [...state.boards, state.lastRemovedBoard],
    //       lastRemovedBoard: null,
    //     }
    //   }
    //   break
    default:
      break
  }
  return newState
}
