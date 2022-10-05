import logo from './logo.svg';
import './App.css';
import {Player} from './scorecard-components/Player'
import React from 'react';

export default class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      curPlayer: 1,
      playerName: 'Chase',
      dice: Array(6).fill(0),
      rollNumber: 0,
    }
  }

  moved(){
    this.setState({
      rollNumber: 0
    })
    console.log('moved');
  }

  randomValues(){
    let dice = []
    let rollNumber = this.state.rollNumber;

    if(rollNumber++ <3){
      for(var i=0; i < 6; i++){
        dice.push(Math.floor(Math.random() * 6 + 1));
      }
      
      this.setState({
        dice: dice,
        rollNumber: rollNumber
      })
    }
  }

  reset(){
    this.setState({
      dice: Array(6).fill(0)
    })
  }

  showDice(){
    const dice = this.state.dice;
    let diceDiv = [];
    dice.forEach(die => {
      diceDiv.push(<div className={"die"}>{die}</div>);
    })
    return diceDiv;
  }
  render(){
    return (
      <>
        <div className='dice'>{this.showDice()}</div>
        <button onClick={() => this.randomValues()}>Roll</button>
        <br></br><br></br>
        <Player values={this.state.dice} reset={() => this.reset()} moved={() => this.moved()}/>
        
      </>
    );
  }
}

