export const SET_BOARDS = "SET_BAORDS"
export const SET_BOARD = "SET_BAORD"
export const REMOVE_BOARD = "REMOVE_BOARD"
export const ADD_BOARD = "ADD_BOARD"
export const UPDATE_BOARD = "UPDATE_BOARD"
export const UNDO_REMOVE_BOARD = "UNDO_REMOVE_BOARD"
export const SET_IS_CREATE_BOARD = "SET_IS_CREATE_BOARD"

const initialState = {
  boards: [],
  isCreateBoard: false,
  lastRemovedBoard: null,
}

export function boardReducer(state = initialState, action) {
  var newState = state
  var boards
  var board
  switch (action.type) {
    case SET_IS_CREATE_BOARD:
      return { ...state, isCreateBoard: action.isCreateBoard }
    case SET_BOARDS:
      newState = { ...state, boards: action.boards }
      break
    case SET_BOARD:
      newState = { ...state, board: action.board }
      break
    case REMOVE_BOARD:
      const lastRemovedBoard = state.boards.find(
        (board) => board._id === action.boardId
      )
      boards = state.boards.filter((board) => board._id !== action.boardId)
      newState = { ...state, boards, lastRemovedBoard }
      break
    case ADD_BOARD:
      newState = { ...state, boards: [...state.boards, action.board] }
      break
    case UPDATE_BOARD:
      boards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      newState = { ...state, boards }
      break
    case UNDO_REMOVE_BOARD:
      if (state.lastRemovedBoard) {
        newState = {
          ...state,
          boards: [...state.boards, state.lastRemovedBoard],
          lastRemovedBoard: null,
        }
      }
      break
    default:
  }
  return newState
}
