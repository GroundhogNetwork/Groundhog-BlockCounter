import React, { Component } from 'react';
import logo from './logo.png';
import Web3 from 'web3';
import Moment from 'moment';
import './App.css';

let web3 = new Web3('https://mainnet.infura.io');



class App extends Component {

  constructor() {
    super();
    this.state = {
      blockNumber: 0,
      forkDate: '2019-01-17',
      finalBlockNumber: 7080000,
      days: 'x',
      hours: 'x',
      minutes: 'x'
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
            let difference   = this.state.finalBlockNumber - resp;
            let timeToFork   = difference * 15;
            let forkDuration = new Moment.duration(timeToFork, 's');
            let currentTime  = new Moment();
            this.setState({
              blockNumber: resp,
              forkDate:    currentTime.add(timeToFork, 'seconds').format('YYYY-MM-DD'),
              days:        forkDuration.days(),
              hours:       forkDuration.hours(),
              minutes:     forkDuration.minutes()
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
            <h1 className="thinFont center-align"><span id="currentBlock" className="groundhog-green text-accent-2 smallScreen orange-text">{this.state.blockNumber.toLocaleString()}</span> / <span id="forkBlock" className="orange-text smallScreen">{this.state.finalBlockNumber.toLocaleString()}</span><span >&nbsp;&nbsp;Blocks&nbsp;</span></h1>
            <h2 className="thinFont center-align orange-text">~
                <span className="center-align groundhog-green">{this.state.days}</span><span className="center-align"> Days </span>
                <span className="center-align groundhog-green">{this.state.hours}</span><span className="center-align"> Hours </span>
                <span className="center-align groundhog-green">{this.state.minutes}</span><span className="center-align"> Minutes</span>
            </h2>
            <h3>~ {this.state.forkDate}</h3>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
