import { boardService } from "../../services/board.service.js"
import { store } from "../store.js"
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../services/event-bus.service.js"
import {
  ADD_BOARD,
  REMOVE_BOARD,
  SET_BOARD,
  SET_BOARDS,
  UNDO_REMOVE_BOARD,
  UPDATE_BOARD,
} from "../reducers/board.reducer"
import { CARD_DETAIL_OPEN, CARD_DETAIL_CLOSE } from "../reducers/system.reducer"

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  }
}
export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  }
}

export function openCardDetail() {
  store.dispatch({
    type: CARD_DETAIL_OPEN,
  })
}

export function closeCardDetail() {
  store.dispatch({
    type: CARD_DETAIL_CLOSE,
  })
}

export function CloseActionModal() {
  store.dispatch({
    type: "MODAL_CLOSE",
  })
}
export function OpenActionModal(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  store.dispatch({
    type: "MODAL_OPEN",
  })
}

export async function loadBoards(searchBy) {
  try {
    const boards = await boardService.query(searchBy)
    console.log("Boards from DB:", boards)
    store.dispatch({
      type: SET_BOARDS,
      boards,
    })
  } catch (err) {
    console.log("Cannot load boards", err)
    throw err
  }
}

export async function setBoard(board) {
  console.log(store.getState().boardModule.board)

  try {
    store.dispatch({
      type: SET_BOARD,
      board,
    })
  } catch (err) {
    console.log("Cannot load board", err)
    throw err
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch(getActionRemoveBoard(boardId))
  } catch (err) {
    console.log("Cannot remove board", err)
    throw err
  }
}

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    console.log("Added Board", savedBoard)
    store.dispatch(getActionAddBoard(savedBoard))
    return savedBoard
  } catch (err) {
    console.log("Cannot add board", err)
    throw err
  }
}

export function updateBoard(board) {
  return boardService
    .save(board)
    .then((savedBoard) => {
      console.log("Updated Board:", savedBoard)
      store.dispatch(getActionUpdateBoard(savedBoard))
      return savedBoard
    })
    .catch((err) => {
      console.log("Cannot save board", err)
      throw err
    })
}

export function getCardById(board, cardId) {
  const cardGroup = board.groups.find((group) =>
    group?.cards?.find((card) => card.id === cardId)
  )
  const card = cardGroup?.cards.find((card) => card.id === cardId)
  return card
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
  store.dispatch({
    type: REMOVE_BOARD,
    boardId,
  })
  showSuccessMsg("Board removed")

  boardService
    .remove(boardId)
    .then(() => {
      console.log("Server Reported - Deleted Succesfully")
    })
    .catch((err) => {
      showErrorMsg("Cannot remove board")
      console.log("Cannot load boards", err)
      store.dispatch({
        type: UNDO_REMOVE_BOARD,
      })
    })
}
