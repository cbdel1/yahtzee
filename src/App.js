import logo from './logo.svg';
import './App.css';
import {Player} from './scorecard-components/Player'
import React from 'react';

export default class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      curPlayer: 1,
      playerName: 'Chase'
    }
  }

  render(){
    return (
      <>
        <Player name={this.state.playerName} player={this.state.curPlayer}/>
      </>
    );
  }


}

