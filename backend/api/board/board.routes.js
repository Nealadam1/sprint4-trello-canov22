const express = require('express')
const router = express.Router()
const { getBoards } = require('./board.controller')

router.get('/', getBoards)

module.exports = router