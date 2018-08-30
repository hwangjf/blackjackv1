import {
  DEAL,
  GET_DECK_ID,
  ADD_HAND
} from '../actions/types';

const initialState = {
  dealerCards: [],
  hands: ["hand1"],
  playerCards: [],
  deckId: ""
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_HAND:
      let addedhands = [...state.hands]
      addedhands.push(`hands${state.players.length}`)
      return {
        ...state,
        hands: addedhands
      }
    case GET_DECK_ID:
      return {
        ...state,
        deckId: action.payload
      }
    case DEAL:
      return {
        ...state,
        playerCards: [...state.playerCards, action.payload.playerCards],
        dealerCards: [...state.dealerCards, action.payload.dealerCards]
      }
    default: return state;
  }
}

export default gameReducer;