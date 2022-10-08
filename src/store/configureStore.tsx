import { configureStore } from '@reduxjs/toolkit'
// import countries from './countries'
// import cart from "./cart"
import reducer from './countries'

/* eslint-disable no-underscore-dangle */

const store = configureStore({
  reducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})
/* eslint-enable */

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
