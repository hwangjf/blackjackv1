import React, { Component } from 'react';
import './App.css';
import Table from './containers/Table';
import { getDeckId } from './actions/index';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.getDeckId()
  }

  render() {
    return (
      <div className="App">
        <h1>
          Black Jack
        </h1>
        <button onClick={() => this.props.deal(this.props.deckId)}>
          redux start
        </button>
        <br />
        <br />
        <Table/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDeckId: () => getDeckId(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App);

