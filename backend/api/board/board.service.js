const dbService = require('../../services/db.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'board'

async function query() {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        var boards = await collection.find().toArray()
        console.log(boards);
        return boards
    } catch (err) {
        throw err
    }
}

module.exports = {
    query
}