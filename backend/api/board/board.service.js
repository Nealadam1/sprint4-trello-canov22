const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'board'
const dbGetCollection = dbService.getCollection(COLLECTION_NAME)

async function query() {
    try {
        const collection = await dbGetCollection
        const boards = await collection.find().toArray()
        return boards
    } catch (err) {
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbGetCollection
        const board = await collection.findOne({ _id: ObjectId(boardId) })
        // console.log(board);
        return board
    } catch (err) {
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbGetCollection
        await collection.insertOne(board)
        return board
    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    try {
        // console.log(boardId);
        const collection = await dbGetCollection
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        throw err
    }
}

async function update(board) {
    try {
        // console.log('board');
        // console.log(board);
        // console.log();
        const boardToSave = {
            title: board.title,
            isStarred: board.isStarred,
            archivedAt: board.archivedAt,
            style: board.style,
            labels: board.labels,
            members: board.members,
            groups: board.groups,
            activities: board.activities
        }
        // console.log(boardToSave);

        const collection = await dbGetCollection
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}