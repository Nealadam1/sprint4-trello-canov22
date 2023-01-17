import { asyncStorageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_KEY = "board"

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
}
window.cs = boardService

async function query() {
  var boards = await asyncStorageService.query(STORAGE_KEY)
  return boards
}

function getById(boardId) {
  return asyncStorageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  // throw new Error('Nope')
  await asyncStorageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await asyncStorageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    savedBoard = await asyncStorageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

function getEmptyBoard() {
  return {
    vendor: "Susita-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// asyncStorageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
