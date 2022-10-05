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
        <Player selected={"fours"} values={[1,3,2,4,1]}/>
      </>
    );
  }


}

