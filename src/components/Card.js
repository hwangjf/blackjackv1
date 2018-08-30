import React, { Component } from 'react'

class Card extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      display: this.initDisplay(props)
    }
  }

  initDisplay = (props) => {    
    if (props.player === "dealer" && props.index === 1) {
      return "back"
    } else {
      return "front"
    }
  }

  handleClick = () => {
    if (this.state.display === "back") {
      this.props.handValue()
      this.setState({display: "front"})
    } else {
      this.props.handValue()
      this.setState({display:"back"})
    }
  }

  suit = () => {
    switch(this.props.suit) {
      case "HEARTS":
        return "♥"
      case "SPADES":
        return "♠"
      case "CLUBS":
        return "♣"
      case "DIAMONDS":
        return "♦"
      default:
        return ""
    }
  }
  
  color = () => {
    switch (this.props.suit) {
      case "HEARTS":
        return "red"
      case "SPADES":
        return "black"
      case "CLUBS":
        return "black"
      case "DIAMONDS":
        return "red"
      default:
        return "black"
    }
  }

  rotate = () => {
    let degrees
    switch(this.props.length) {
      case 2:
        degrees = -6 + this.props.index * 12
        break
      case 3:
        degrees = -19 + this.props.index * 13
        break
      case 4:
        degrees = -22 + this.props.index * 13
        break
      case 5:
        degrees = -26 + this.props.index * 14
        break
      case 6:
        degrees = -30 + this.props.index * 14
        break
      case 7:
        degrees = -40 + this.props.index * 12
        break
      case 8:
        degrees = -40 + this.props.index * 10
        break
      case 9:
        degrees = -40 + this.props.index * 10
        break
      case 10:
        degrees = -40 + this.props.index * 10
        break
      case 11:
        degrees = -40 + this.props.index * 10
        break
      default:
        degrees = 0
    }

    return `rotate(${degrees}deg)`
  }

  render() {
    console.log(this.props)
    return (
      <span 
        className="card" 
        onClick={this.handleClick}
        style={{
          zIndex: this.props.index+1,
          transform: this.rotate()
        }}
      >
      
      {this.state.display === "front" 
      ? <span>
          <span
            style={{
              float: "left",
              marginLeft: "6%",
              marginTop: "5%",
              color: this.color()
            }}
          >
            {parseInt(this.props.value, 10) > 0
            ? this.props.value
            : this.props.value[0]
            }

            <div>
              {this.suit()}
            </div>
          </span>

          <div
            style={{
              marginTop: "34px",
              marginRight: "19.5px",
              fontSize: "40px",
              color: this.color()
            }}
          >
            {this.suit()}
          </div>

          <span
            style={{
              float: "right",
              marginLeft: "27.5%",
              marginBottom: "5%",
              bottom: "0",
              position: "absolute",
              transform: "rotate(180deg)",
              color: this.color()
            }}
          >
            {parseInt(this.props.value, 10) > 0
              ? this.props.value
              : this.props.value[0]
            }

            <div>
              {this.suit()}
            </div>
            
          </span>
        </span>

      : <img 
          src="http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_grande.png?v=1530155027" 
          alt={`card value is ${this.props.value}`}
          style={{
            width:"98px",
            height:"140px"
          }}
        />
      }
      </span>
    )
  }
}

export default Card;