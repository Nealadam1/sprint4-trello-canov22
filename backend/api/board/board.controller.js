const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.json(boards)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getBoardById(req, res) {
    try {
        // console.log('hello query');
        const boardId = req.params.id
        const board = await boardService.getById(boardId)
        res.json(board)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function addBoard(req, res) {
    try {
        const board = req.body
        const addedBoard = await boardService.add(board)
        res.json(addedBoard)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update board' })
    }
}

async function removeBoard(req, res) {
    try {
        const boardId = req.params.id
        const removedId = await boardService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove board' })
    }
}

module.exports = {
    getBoards,
    getBoardById,
    addBoard,
    updateBoard,
    removeBoard
}