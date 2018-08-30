import {
  DEAL,
  GET_DECK_ID,
  ADD_HAND
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

export function addHand() {return {type: ADD_HAND} }

export const deal = (dispatch, deckId, num=4) => {
  Adapter.deal(deckId, num)    
    .then(data => {
      let playerCardsArray = [data.cards[0],data.cards[2]]
      let dealerCardsArray = [data.cards[1],data.cards[3]]
      dispatch({
        type: DEAL,
        payload: {
          playerCards: playerCardsArray,
          dealerCards: dealerCardsArray
        }
      })
    })
}