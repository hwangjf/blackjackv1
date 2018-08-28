import { createStore } from 'redux'
import gameReducer from '../reducers'

const initialState = {}

const store = createStore(
  gameReducer, 
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store