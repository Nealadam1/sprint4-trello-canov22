import io from "socket.io-client"
import { userService } from "./user.service"


export const SOCKET_EVENT_UPDATE_BOARDS = 'update-boards-event'
export const SOCKET_EMIT_UPDATE_BOARDS = 'update-boards'

export const SOCKET_EVENT_UPDATE_BOARD = 'update-board-event'
export const SOCKET_EMIT_UPDATE_BOARD = 'update-board'

export const SOCKET_EVENT_UPDATE_CARD = 'update-card-event'
export const SOCKET_EMIT_UPDATE_CARD = 'update-card'

const SOCKET_EMIT_LOGIN = "set-user-socket"
const SOCKET_EMIT_LOGOUT = "unset-user-socket"

const baseUrl = process.env.NODE_ENV === "production" ? "" : "//localhost:3030"
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
            setTimeout(() => {
                const user = userService.getLoggedinUser()
                if (user) this.login(user._id)
            }, 500)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}
