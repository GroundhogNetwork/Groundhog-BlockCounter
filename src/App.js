import React, { Component } from 'react';
import logo from './logo.png';
import Web3 from 'web3';
import './App.css';

let web3 = new Web3('https://mainnet.infura.io');



class App extends Component {

  constructor() {
    super();
    this.state = {
      blockNumber: 0
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
        () => this.updateInfura(),
        2000
    );
  }

  updateInfura() {
      return web3.eth.getBlockNumber()
          .then((resp) => {
            console.log('checked!');
            this.setState({
              blockNumber: resp
            })
          });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="container">
            <h1 className="thinFont center-align orange-text">Constantinople Fork</h1>
            <h1 className="thinFont center-align"><span id="currentBlock" className="groundhog-green text-accent-2 smallScreen orange-text">{this.state.blockNumber.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span> / <span id="forkBlock" className="orange-text smallScreen">7,080,000</span><span >&nbsp;&nbsp;Blocks&nbsp;</span></h1>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
