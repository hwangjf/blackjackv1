import { createStore } from 'redux'
import rootReducer from '../reducers'

// const initialState = {}

const store = createStore(
  rootReducer,
  // initialState
  /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store