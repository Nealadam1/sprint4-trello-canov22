import { boardService } from "../../services/board.service"

export const SET_BOARDS = "SET_BOARDS"
export const SET_BOARD = "SET_BOARD"
export const REMOVE_BOARD = "REMOVE_BOARD"
export const ADD_BOARD = "ADD_BOARD"
export const UPDATE_BOARD = "UPDATE_BOARD"
export const UNDO_REMOVE_BOARD = "UNDO_REMOVE_BOARD"
export const SET_GROUP = "SET_GROUP"
export const UPDATE_CARD = "UPDATE_CARD"
export const SET_CARD = "SET_CARD"
export const ADD_LABEL = "ADD_LABEL"
export const SET_FILTER_CARD_BY = "SET_FILTER_CARD_BY"

const initialState = {
  boards: [],
  board: null,
  group: null,
  card: null,
  label: null,
  lastRemovedBoard: null,
  filterCardBy: "",
}

export function boardReducer(state = initialState, action) {
  var newState = state
  var boards
  switch (action.type) {
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
    case SET_GROUP: {
      newState = { ...state, group: action.group }
      break
    }
    case UPDATE_CARD: {
      const groupIdx = state.board.groups.findIndex(
        (group) => group.id === state.group.id
      )
      const cardIdx = state.board.groups[groupIdx].cards.findIndex(
        (card) => card.id === state.card.id
      )
      const newBoard = {
        ...state.board,
        groups: [
          ...state.board.groups.slice(0, groupIdx),
          {
            ...state.board.groups[groupIdx],
            cards: [
              ...state.board.groups[groupIdx].cards.slice(0, cardIdx),
              action.card,
              ...state.board.groups[groupIdx].cards.slice(cardIdx + 1),
            ],
          },
          ...state.board.groups.slice(groupIdx + 1),
        ],
      }
      console.log(newBoard)

      newState = { ...state, board: newBoard }
      break
    }
    case SET_CARD: {
      newState = { ...state, card: action.card }
      break
    }
    case SET_FILTER_CARD_BY: {
      newState = { ...state, filterCardBy: action.filterBy }
    }
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
