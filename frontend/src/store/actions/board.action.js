import { boardService } from "../../services/board.service.js"
import { store } from "../store.js"
import { showSuccessMsg, showErrorMsg, } from "../../services/event-bus.service.js"

import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_GROUP, } from "../reducers/board.reducer"
import { CARD_DETAIL_OPEN, CARD_DETAIL_CLOSE } from "../reducers/system.reducer"
import { SET_LABELS } from "../reducers/label.reducer.js"

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

export function getActionSetBoard(board) {
  return {
    type: SET_BOARD,
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
export function OpenActionModal(ev,modalType) {
  ev.preventDefault()
  ev.stopPropagation()
  store.dispatch({
    type: "MODAL_OPEN",
    modalType
  })
}

export async function loadBoards(searchBy = '') {
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

export async function setGroup(group) {
  try {
    store.dispatch({
      type: SET_GROUP,
      group,
    })
  } catch (err) {
    console.log(err)
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

export function addMember(memberId, card) {
  const board = structuredClone(store.getState().boardModule.board)
  const group = structuredClone(store.getState().boardModule.group)
  const updatedMembers = card.memberIds
    ? [...card.memberIds, memberId]
    : [memberId]
  const updatedCard = { ...card, memberIds: updatedMembers }
  const updatedCards = group.cards.map((card) =>
    updatedCard.id === card.id ? updatedCard : card
  )
  const updatedGroup = { ...group, cards: updatedCards }
  const updatedGroups = board.groups.map((group) =>
    group.id === updatedGroup.id ? updatedGroup : group
  )
  board.groups = updatedGroups
  store.dispatch(getActionSetBoard(board))
  boardService.save(board)
}

export function removeMember(updatedMemberIds, card) {
  const board = structuredClone(store.getState().boardModule.board)
  const group = structuredClone(store.getState().boardModule.group)
  const updatedCard = { ...card, memberIds: updatedMemberIds }
  const updatedCards = group.cards.map((card) =>
    updatedCard.id === card.id ? updatedCard : card
  )
  const updatedGroup = { ...group, cards: updatedCards }
  const updatedGroups = board.groups.map((group) =>
    group.id === updatedGroup.id ? updatedGroup : group
  )
  const updatedBoard = { ...board, groups: updatedGroups }
  store.dispatch(getActionSetBoard(updatedBoard))
  boardService.save(updatedBoard)
}

export async function addGroup(newGroup) {
  try {
    const group = boardService.createGroup(newGroup)
    const board = structuredClone(store.getState().boardModule.board)
    board.groups = [...board.groups, group]
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
  }
}

export async function deleteGroup(groupId) {
  const board = structuredClone(store.getState().boardModule.board)
  const filteredGroups = board.groups.filter((group) => group.id !== groupId)
  board.groups = filteredGroups
  store.dispatch(getActionSetBoard(board))
  boardService.save(board)
}

export async function addCard(newCard, groupId) {
  try {
    const card = boardService.createCard(newCard)
    const board = structuredClone(store.getState().boardModule.board)
    const group = board.groups.find((group) => group.id === groupId)
    group.cards
      ? (group.cards = [...group.cards, card])
      : (group.cards = [card])
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
  }
}

export async function deleteCard(cardId, groupId) {
  try {
    const board = structuredClone(store.getState().boardModule.board)
    const group = board.groups.find((group) => group.id === groupId)
    group.cards = group.cards.filter((card) => card.id !== cardId)
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
  }
}

export function updateBoard(board) {
  return boardService
    .save(board)
    .then((savedBoard) => {
      // console.log("Updated Board:", savedBoard)
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


export async function setLabels(labels) {
  console.log('setLabels action', labels);
  store.dispatch({
    type: SET_LABELS,
    labels,
  })
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
