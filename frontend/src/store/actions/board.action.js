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
  SET_GROUP,
  UPDATE_CARD,
  SET_CARD,
  SET_FILTER_CARD_BY,
} from "../reducers/board.reducer"
import { CARD_DETAIL_OPEN, CARD_DETAIL_CLOSE } from "../reducers/system.reducer"
import {
  ADD_LABEL,
  PUT_LABEL,
  REMOVE_LABEL,
  SET_LABELS,
} from "../reducers/label.reducer.js"
import { httpService } from "../../services/http.service.js"
import { utilService } from "../../services/util.service.js"
import { userService } from "../../services/user.service.js"

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  }
}

export function getActionAddBoard(board) {
  // httpService.post('board', board)
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

export function closeActionModal() {
  store.dispatch({
    type: "MODAL_CLOSE",
  })
}
export function OpenActionModal(ev, modalType) {
  ev.preventDefault()
  ev.stopPropagation()

  store.dispatch({
    type: "MODAL_OPEN",
    modalType,
  })
}

export async function loadBoards(searchBy = "") {
  try {
    const boards = await httpService.get('board')
    // const boards = await boardService.query(searchBy)
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

    console.log('set board', board);
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
export async function setCardToStoreRef(card) {
  try {
    store.dispatch({
      type: SET_CARD,
      card,
    })
  } catch (err) {
    console.log(err)
  }
}
export async function updateCard(card, action) {
  try {
    store.dispatch({
      type: UPDATE_CARD,
      card,
    })
    const board = store.getState().boardModule.board
    boardService.save(board)
  } catch (err) {
    console.log(err)
    return
  }
  updateActivities(action, card.title)
}

export async function removeBoard(boardId) {
  try {
    // await boardService.remove(boardId)
    await httpService.delete(boardId)
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
  updateActivities("ADDED_GROUP", newGroup.title)
}

export async function filterCardsBy(
  filterBy = { title: "", labels: [], members: [] }
) {
  store.dispatch({
    type: SET_FILTER_CARD_BY,
    filterBy,
  })
}

export async function updateGroup(group, action) {
  try {
    const board = structuredClone(store.getState().boardModule.board)
    const updatedGroup = group
    console.log(updatedGroup)
    const updatedGroups = board.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    console.log(updatedGroups)
    board.groups = updatedGroups
    console.log(board)
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
  }
  updateActivities(action, group.title)
}
export async function updateGroups(groups) {
  try {
    const board = structuredClone(store.getState().boardModule.board)
    const updatedGroups = groups
    board.groups = updatedGroups
    console.log(board)
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
  }
}

export async function deleteGroup(groupId) {
  const board = structuredClone(store.getState().boardModule.board)
  try {
    const filteredGroups = board.groups.filter((group) => group.id !== groupId)
    board.groups = filteredGroups
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
    return
  }
  const deletedGroup = board.groups.find((group) => group.id === groupId)
  updateActivities("ARCHIVED_GROUP", deletedGroup.title)
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
    return
  }
  updateActivities("ADDED_CARD", newCard.title)
}

const activityMessages = {
  ADDED_CARD: "added the card",
  ADDED_GROUP: "added the group",
  ARCHIVED_GROUP: "archived the group",
  ARCHIVED_CARD: "archived the card",
  ADDED_TODO: "added a todo in card",
  CHECKED_TODO: "checked a todo in card",
  UNCHECKED_TODO: "unchecked a todo in card",
  DELETE_CHECKLIST: "deleted a checklist in card",
  DELETE_TODO: "deleted a todo in card",
  CHANGE_DESCRIPTION: "changed the description in card",
  EDIT_CARD: "edited the card to",
  ADD_CHECKLIST: "added a checklist in card",
  SET_DATE: "set a date in card",
  ADD_LABEL: "added a label in card",
  REMOVE_LABEL: "removed a label in card",
  CHANGE_BACKGROUND: "changed a background color in card",
  REMOVE_BACKGROUND: "removed a background color in card",
}

function updateActivities(cmpType, action) {
  const board = structuredClone(store.getState().boardModule.board)
  const fullname = userService?.getLoggedinUser()?.fullname || "Guest"
  const userImage =
    userService.getLoggedinUser()?.imgUrl ||
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
  const activitie = boardService.createActivitie(
    action,
    fullname,
    activityMessages[cmpType],
    userImage
  )
  const updatedActivites = board.activities
    ? [activitie, ...board.activities]
    : [activitie]
  board.activities = updatedActivites
  store.dispatch(getActionSetBoard(board))
  boardService.save(board)
}

export async function deleteCard(cardId, groupId) {
  const board = structuredClone(store.getState().boardModule.board)
  const group = board.groups.find((group) => group.id === groupId)
  try {
    group.cards = group.cards.filter((card) => card.id !== cardId)
    store.dispatch(getActionSetBoard(board))
    boardService.save(board)
  } catch (err) {
    console.log(err)
    return
  }
  const archivedCard = (group.cards = group.cards.find(
    (card) => cardId === card.id
  ))
  console.log(archivedCard)
  updateActivities("ARCHIVED_CARD", archivedCard.title)
}

export async function updateBoard(board) {
  try {
    const savedBoard = await boardService.save(board)
    store.dispatch(getActionUpdateBoard(savedBoard))
    httpService.put(savedBoard)
    return savedBoard
  } catch (err) {
    console.log("Cannot save board", err)
  }

  // return boardService.save(board)
  //   .then((savedBoard) => {
  //     // console.log("Updated Board:", savedBoard)
  //     store.dispatch(getActionUpdateBoard(savedBoard))
  //     return savedBoard
  //   })
  //   .catch((err) => {
  //     console.log("Cannot save board", err)
  //     throw err
  //   })
}

export function getCardById(board, cardId) {
  const cardGroup = board?.groups?.find((group) =>
    group?.cards?.find((card) => card.id === cardId)
  )
  const card = cardGroup?.cards.find((card) => card.id === cardId)
  return card
}

export async function setLabels(labels) {
  console.log("setLabels action", labels)
  store.dispatch({
    type: SET_LABELS,
    labels,
  })
}

export function addLabel(label) {
  // console.log('redux', label)
  store.dispatch({
    type: ADD_LABEL,
    label,
  })
}

export function replaceLabel(label) {
  store.dispatch({
    type: PUT_LABEL,
    label,
  })
}

export function removeLabel(labelId) {
  store.dispatch({
    type: REMOVE_LABEL,
    labelId,
  })
}

// export async function saveLabelToBoard(label, board) {
//   console.log('board', label, board);
// }

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
