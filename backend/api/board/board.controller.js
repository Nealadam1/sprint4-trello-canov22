const boardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        console.log('hello');
        res.json(boards)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

module.exports = {
    getBoards
}