import { createStore, combineReducers } from "redux"

import { boardReducer } from "./reducers/board.reducer"
// import { userReducer } from "./user.reducer.js"
// import { reviewReducer } from "./review.reducer"
// import { systemReducer } from "./system.reducer"

const rootReducer = combineReducers({
  boardModule: boardReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  console.log("**** Store state changed: ****")
  console.log("storeState:\n", store.getState())
  console.log("*******************************")
})
