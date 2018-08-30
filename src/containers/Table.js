import React, { Component } from 'react';
import Hand from './Hand';
import { deal, addHand } from '../actions/index';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="table">
          <div className="dealer">
            <h3>
              Dealer
            </h3>
          </div>

          <div className="dealerCards">
            {this.props.dealerCards.length > 0
              ? <Hand 
                  key={`${this.props.players[0]}`}
                  player={`${this.props.players[0]}`} 
                />
              : null
            }
          </div>

          <div className="playerCards">
            {this.props.playerCards.length > 0
              ? <Hand 
                  key={`${this.props.players[1]}`}
                  player={`${this.props.players[1]}`} 
                />
              : null
            }
          </div>
          <button onClick={()=>this.props.addPlayer()}>addPlayer</button>

          <div className="player">
            <h3>Player</h3>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.gameReducer.players,
    deckId: state.gameReducer.deckId,
    playerCards: state.gameReducer.playerCards,
    dealerCards: state.gameReducer.dealerCards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deal: (id) => deal(dispatch, id),
    addHand: () => dispatch(addHand())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);


// class Table extends Component {
//   state = {
//     deckId: "",
//     playerCards: [],
//     dealerCards: [],
//     display: "back",
//     currentPlayer: "",
//     winsAndLosses: []
//   }

//   handleDisplay = () => {
//     if (this.state.display === "back") {
//       this.setState({ display: "front" })
//     } else {
//       this.setState({ display: "back" })
//     }
//   }

//   handleStartGame = () => {
//     fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//       .then(response => response.json())
//       .then(data => this.setState({ deckId: data.deck_id }))
//   }

//   handleDeal = () => {
//     if (this.state.deckId.length > 0) {
//       fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
//         .then(response => response.json())
//         .then(data => {
//           let playerCardsArray = [...this.state.playerCards]
//           let dealerCardsArray = [...this.state.dealerCards]
//           for (let i = 0; i < data.cards.length; i++) {
//             if (i % 2 === 0) {
//               playerCardsArray.push(data.cards[i])
//             } else {
//               dealerCardsArray.push(data.cards[i])
//             }
//           }
//           this.setState({ currentPlayer: "player", playerCards: playerCardsArray, dealerCards: dealerCardsArray })
//         })
//     }
//   }

//   handleHit = () => {
//     fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
//       .then(response => response.json())
//       .then(data => {
//         if (this.state.currentPlayer === "player") {
//           let playerCardsArray = [...this.state.playerCards]
//           playerCardsArray.push(data.cards[0])
//           this.setState({ playerCards: playerCardsArray })
//         } else {
//           let dealerCardsArray = [...this.state.dealerCards]
//           dealerCardsArray.push(data.cards[0])
//           this.setState({ dealerCards: dealerCardsArray })
//         }
//       })
//   }

//   handlePlayerStand = () => {
//     this.setState({ currentPlayer: "dealer" })
//   }

//   handleNewGame = () => {
//     this.setState({
//       playerCards: [],
//       dealerCards: [],
//       display: "back",
//       currentPlayer: ""
//     })
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div>
//         <button onClick={()=>this.props.deal(this.props.deckId)}>redux start</button>
        
//         <br/>
//         <br />
        
//         <div className="table">

//           <div className="dealer">
//             <h3>
//               Dealer
//             </h3>
//             {this.state.dealerCards.length > 0 && this.state.currentPlayer === "dealer"
//               ? <div>
//                 <button onClick={this.handleHit}>Hit</button>
//                 <button onClick={this.handleDealerStand}>Stand</button>
//               </div>
//               : null
//             }
//           </div>

//           <div className="dealerCards">
//             {this.props.dealerCards.length > 0
//               ? <Hand cards={this.props.dealerCards} handleHit={this.handleHit} dealerStop={this.dealerStop} player="dealer" />
//               : null
//             }
//           </div>

//           <div className="playerCards">
//             {this.props.playerCards.length > 0
//               ? <Hand cards={this.props.playerCards} player="player" />
//               : null
//             }
//           </div>

//           <div className="player">
//             {this.state.playerCards.length > 0 && this.state.currentPlayer === "player"
//               ? <div>
//                 <button onClick={this.handleHit}>Hit</button>
//                 <button onClick={this.handlePlayerStand}>Stand</button>
//               </div>
//               : null
//             }

//             <h3>
//               Player
//             </h3>
//           </div>
//         </div>
//         <br/>
//         <br/>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     deckId: state.deckId,
//     playerCards: state.playerCards,
//     dealerCards: state.dealerCards
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     deal: (id) => deal(dispatch, id)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Table);