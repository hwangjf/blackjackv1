import React, { Component } from 'react';
import './App.css';
import Table from './containers/Table';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          Black Jack
        </h1>
        
        <Table/>
      </div>
    )
  }
  
}

export default App;
