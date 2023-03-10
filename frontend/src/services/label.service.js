import { setBoard, updateBoard } from "../store/actions/board.action"
import { asyncStorageService } from "./async-storage.service"

export function saveLabelToBoard(currLabel, board) {
  let editingLabel = board.labels.find((label) => {
    return label.id === currLabel.id
  })

  if (editingLabel) {
    editingLabel = currLabel
    let replaceLabel = board.labels.findIndex((label) => label.id === editingLabel.id)
    board.labels.splice(replaceLabel, 1, editingLabel)
    updateBoard({ ...board, labels: [...board.labels] })
    setBoard({ ...board, labels: [...board.labels] })
  } else {
    board.labels.push(currLabel)
    updateBoard(board)
  }
}

export function removeLabelFromBoard(labelId, board) {
  let remIdx = board.labels.findIndex((label) => labelId === label.id)
  board.labels.splice(remIdx, 1)
  updateBoard(board)
}

