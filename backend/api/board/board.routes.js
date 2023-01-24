const express = require('express')
const router = express.Router()
const { getBoards, getBoardById, addBoard, removeBoard, updateBoard } = require('./board.controller')

router.get('/', getBoards)
router.get('/:id', getBoardById)
router.post('/', addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', removeBoard)

module.exports = router