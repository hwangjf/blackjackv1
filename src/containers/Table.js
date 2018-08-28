import React, { Component } from 'react';
import Hand from './Hand';
import { getDeckId, startGame } from '../actions/index';
import { connect } from 'react-redux';

class Table extends Component {
  state = {
    deckId: "",
    playerCards: [],
    dealerCards: [],
    display: "back",
    currentPlayer: "",
    winsAndLosses: []
  }

  handleDisplay = () => {
    if (this.state.display === "back") {
      this.setState({ display: "front" })
    } else {
      this.setState({ display: "back" })
    }
  }

  handleStartGame = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => this.setState({ deckId: data.deck_id }))
  }

  handleDeal = () => {
    if (this.state.deckId.length > 0) {
      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
        .then(response => response.json())
        .then(data => {
          let playerCardsArray = [...this.state.playerCards]
          let dealerCardsArray = [...this.state.dealerCards]
          for (let i = 0; i < data.cards.length; i++) {
            if (i % 2 === 0) {
              playerCardsArray.push(data.cards[i])
            } else {
              dealerCardsArray.push(data.cards[i])
            }
          }
          this.setState({ currentPlayer: "player", playerCards: playerCardsArray, dealerCards: dealerCardsArray })
        })
    }
  }

  handleHit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        if (this.state.currentPlayer === "player") {
          let playerCardsArray = [...this.state.playerCards]
          playerCardsArray.push(data.cards[0])
          this.setState({ playerCards: playerCardsArray })
        } else {
          let dealerCardsArray = [...this.state.dealerCards]
          dealerCardsArray.push(data.cards[0])
          this.setState({ dealerCards: dealerCardsArray })
        }
      })
  }

  handlePlayerStand = () => {
    this.setState({ currentPlayer: "dealer" })
  }

  handleNewGame = () => {
    this.setState({
      playerCards: [],
      dealerCards: [],
      display: "back",
      currentPlayer: ""
    })
  }

  render() {
    return (
      <div>
        {this.state.deckId.length > 0
          ? <React.Fragment>
              {this.state.dealerCards.length === 0
                ? <button onClick={this.handleDeal}>
                    Deal
                  </button>
                : <button onClick={this.handleNewGame}>New Game</button>
              }
            </React.Fragment>
          : <button onClick={this.handleStartGame}>
              Start Game
            </button>
        }
        <br />
        <br />

        <div className="table">

          <div className="dealer">
            <h3>
              Dealer
            </h3>
            {this.state.dealerCards.length > 0 && this.state.currentPlayer === "dealer"
              ? <div>
                <button onClick={this.handleHit}>Hit</button>
                <button onClick={this.handleDealerStand}>Stand</button>
              </div>
              : null
            }
          </div>

          <div className="dealerCards">
            {this.state.dealerCards.length > 0
              ? <Hand cards={this.state.dealerCards} handleHit={this.handleHit} dealerStop={this.dealerStop} player="dealer" />
              : null
            }
          </div>

          <div className="playerCards">
            {this.state.playerCards.length > 0
              ? <Hand cards={this.state.playerCards} player="player" />
              : null
            }
          </div>

          <div className="player">
            {this.state.playerCards.length > 0 && this.state.currentPlayer === "player"
              ? <div>
                <button onClick={this.handleHit}>Hit</button>
                <button onClick={this.handlePlayerStand}>Stand</button>
              </div>
              : null
            }

            <h3>
              Player
            </h3>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deckId: state.deckId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => startGame(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);