import { asyncStorageService } from "./async-storage.service"



const STORAGE_USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
_createDemoData()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
    // changeScore
}

function getUsers() {
    return asyncStorageService.query(STORAGE_USER_KEY)
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await asyncStorageService.get(STORAGE_USER_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return asyncStorageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

// async function update({ _id, score }) {
// const user = await asyncStorageService.get('user', _id)
// user.score = score
// await asyncStorageService.put('user', user)

// const user = await httpService.put(`user/${_id}`, { _id, score })
// // Handle case in which admin updates other user's details
// if (getLoggedinUser()._id === user._id) saveLocalUser(user)
// return user
// }

async function login(userCred) {
    const users = await asyncStorageService.query(STORAGE_USER_KEY)
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await asyncStorageService.post(STORAGE_USER_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, mentions: user.mentions }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _createDemoData() {
    let demoData = utilService.loadFromStorage(STORAGE_USER_KEY)
    if (!demoData) {
        demoData = [
            {
                "_id": "u101",
                "fullname": "Neal Adam",
                "username": "Nealadam@live.com",
                "password": "NealAdam",
                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg",
                "mentions": [{
                    "id": "m101",
                    "boardId": "b101",
                    "cardId": "c101"
                }]
            },
            {
                "_id": "u102",
                "fullname": "Liron Kruchinin",
                "username": "LironKruchinin@gmail.com",
                "password": "LironKruchinin",
                "imgUrl": "https://randomuser.me/api/portraits/men/23.jpg",
                "mentions": [{
                    "id": "m101",
                    "boardId": "b101",
                    "cardId": "c101"
                }]
            },
            {
                "_id": "u103",
                "fullname": "Gilad Dagan",
                "username": "giladdagan@gmail.com",
                "password": "GiladDagan",
                "imgUrl": "https://randomuser.me/api/portraits/men/27.jpg",
                "mentions": [{
                    "id": "m101",
                    "boardId": "b101",
                    "cardId": "c101"
                }]
            }
        ]
        utilService.saveToStorage(TOY_KEY, demoData)
    }
}


