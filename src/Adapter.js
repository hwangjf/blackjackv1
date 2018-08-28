const deckOfCardsUrl = "https://deckofcardsapi.com/api/deck/"


export default class Adapter {
  static getDeckId() {
    return fetch(deckOfCardsUrl + 'new/shuffle/?deck_count=1')
      .then(response => response.json())
  }

  static dealCard(deckId, num) {
    return fetch(deckOfCardsUrl + `${deckId}/draw/?count=${num}`)
      .then(response => response.json())
  }
}
