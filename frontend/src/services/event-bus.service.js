export const SHOW_MSG = "show-msg"
export const ADD_CARD="add-card"
export const UPDATE_CARDS="update-cards"

function createEventEmitter() {
  const listenersMap = {}
  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], listener]
        : [listener]
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        )
      }
    },
    emit(evName, data) {
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach((listener) => listener(data))
    },
  }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
  eventBus.emit(SHOW_MSG, msg)
}

export function callAddCard(groupId){
  eventBus.emit(ADD_CARD, groupId)
}
export function callUpdateCards(group){
  eventBus.emit(UPDATE_CARDS, group)
}

export function showSuccessMsg(txt) {
  showUserMsg({ txt, type: "success" })
}
export function showErrorMsg(txt) {
  showUserMsg({ txt, type: "error" })
}

window.showUserMsg = showUserMsg
