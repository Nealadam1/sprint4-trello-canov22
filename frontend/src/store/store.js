import { createStore, combineReducers } from "redux"

import { boardReducer } from "./reducers/board.reducer"
import { systemReducer } from "./reducers/system.reducer"
import { labelReducer } from "./reducers/label.reducer"

const rootReducer = combineReducers({
  boardModule: boardReducer,
  systemModule: systemReducer,
  labelModule: labelReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  console.log("**** Store state changed: **** \n", store.getState(), "\n *******************************")
  // console.log("storeState:\n", store.getState())
  // console.log("*******************************")
})
