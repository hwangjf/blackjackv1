import {
  START_GAME,
  GET_DECK_ID
} from './types';
import Adapter from '../Adapter';

export const getDeckId = (dispatch) => {
  Adapter.getDeckId()
    .then(data => {
      dispatch({
        type: GET_DECK_ID,
        payload: data.deck_id
      })
    })
}

export const startGame = (dispatch, deckId, num=4) => {
  Adapter.dealCard(deckId, num)    
    .then(data => {
      let playerCardsArray = [data.cards[0],data.cards[2]]
      let dealerCardsArray = [data.cards[1],data.cards[3]]
      dispatch({
        type: GET_DECK_ID,
        payload: {
          playerCards: playerCardsArray,
          dealerCards: dealerCardsArray
        }
      })
    })
}