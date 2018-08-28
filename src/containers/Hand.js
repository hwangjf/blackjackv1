import React, { Component } from 'react';
import Card from '../components/Card'

class Hand extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.initValue(props),
      gameOver: false,
      cards: props.cards
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cards !== this.props.cards) {
      this.setState({cards: this.props.cards}, this.handValue)
    }
  }

  initValue = (props) => {
    let val
    if (props.player ==="dealer") {
      if (parseInt(props.cards[0].value, 10) > 0) {
        val = parseInt(props.cards[0].value, 10)
      } else if (props.cards[0].value === "ACE") {
        val = 11
      } else {
        val = 10
      }
      
      return val
    }
    return props.cards.reduce((acc, card)=> {
      if (parseInt(card.value,10) > 0) {
        val = parseInt(card.value, 10)
      } else if (card.value === "ACE") {
        val = 11
      } else {
        val = 10
      }
      
      return acc + val
    },0)
  }

  handValue = () => {
    let val
    val = this.state.cards.reduce((acc, card) => {
      let cardVal
      if (parseInt(card.value, 10) > 0) {
        cardVal = parseInt(card.value, 10)
      } else if (card.value === "ACE") {
        cardVal = 11
      } else {
        cardVal = 10
      }
      return acc + cardVal
    }, 0)
    for (let i = 0; i<this.state.cards.length; i++) {
      if (this.state.cards[i].value === "ACE" && val > 21) {
        val -= 10
      }
    }

    this.setState({value: val},this.gameOver)
  }

  

  gameOver = () => {
    if (this.state.value > 21) {
      this.setState({ gameOver: true }, this.props.dealerStop)  
    }
  }

  render() {
    return (
      <div>
        {this.props.cards
          ? <div>
              {this.props.cards.map((card,index) => {
                return (
                  <Card 
                    key={card.code} 
                    {...card} 
                    index={index}
                    player={this.props.player}
                    length={this.props.cards.length} 
                    handValue={this.handValue}
                  />
                )
              })}
            {this.props.cards.length > 0
              ? <span style={{marginLeft:"60px"}}>
                  Total: {this.state.value}
                </span>
              : null}
            </div>
          : null
        }
        {this.state.gameOver ? console.log('Game Over') : null}
      </div>
    )
  }
}

export default Hand;