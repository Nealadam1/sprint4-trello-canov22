import { asyncStorageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { utilService } from "./util.service"

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getGuestUser
}

window.userService = userService

function getUsers() {
  // return asyncStorageService.query("user")
  return httpService.get(`user`)
}

async function getById(userId) {
  // const user = await asyncStorageService.get("user", userId)
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  // return asyncStorageService.remove("user", userId)
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // const user = await asyncStorageService.get("user", _id)
  //   user.score = score
  // await asyncStorageService.put("user", user)

  const updatedUser = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return updatedUser
}

async function login(userCred) {
  console.log("userCred", userCred)

  // const users = await asyncStorageService.query("user")
  const users = await httpService.get('user')
  console.log("users", users)

  const user = users.find((user) => user.username === userCred.username)

  if (!user) return

  // socketService.login(user._id)
  const loggedInUser = await httpService.post('auth/login', userCred)
  return saveLocalUser(loggedInUser)
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
  // const user = await asyncStorageService.post("user", userCred)
  const user = await httpService.post('auth/signup', userCred)
  // socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    visitedBoards: user.visitedBoards
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getGuestUser() {
  return { _id: utilService.makeId(), fullname: "Guest", imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png", username: 'Guest' }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
