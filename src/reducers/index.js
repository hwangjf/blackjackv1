import {
  START_GAME,
  GET_DECK_ID
} from '../actions/types';

const initialState = {
  players: ["playerOne", "dealer"],
  playerCards: [],
  dealerCards: [],
  deckId: ""
  // remainingCards: []
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DECK_ID:
      return {
        ...state, 
        deckId: action.payload
      }
    default: return state;
  }
}

export default gameReducer;