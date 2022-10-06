import './App.css';
import {Player} from './scorecard-components/Player'
import {Die} from './dice-components/Die'
import React from 'react';
import * as $ from 'jquery'

export default class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      curPlayer: 1,
      playerName: 'Chase',
      dice: Array(6).fill(<Die number={0} change={1} changeFunction={(status, index) => this.saveDie(status, index)}/>),
      diceNumbers: Array(6).fill(0),
      rollNumber: 0,
      holdIndex: Array(6).fill(false)
    }
  }

  moved(){
    this.setState({
      rollNumber: 0,
      holdIndex: Array(6).fill(false),
    })
    this.reset();
  
  }

  saveDie(status, index){
    let holdIndex = this.state.holdIndex;
    holdIndex[index] = status;
    this.setState({
      holdIndex: holdIndex
    })
  }

  getDice(){
    let dice = this.state.dice;
    let rollNumber = this.state.rollNumber;
    let diceNumbers = [];
    let newRoll = [];

    if(rollNumber++ < 3){
      const holdIndex = this.state.holdIndex;
      dice.forEach((die, index) => {
        if(holdIndex[index] === false){
          let newNumber = Math.floor(Math.random() * 6 + 1)
          newRoll.push(<Die index={index} number={newNumber} change={1} changeFunction={(status, index) => this.saveDie(status, index)}/>);
          diceNumbers.push(newNumber);
        } else {
          newRoll.push(die);
          diceNumbers.push(die.props.number);
        }
        
      })
      this.setState({
        dice: newRoll,
        diceNumbers: diceNumbers,
        rollNumber: this.state.rollNumber+1
      })
    } 
    
   
  }

  reset(){
    this.setState({
      dice: Array(6).fill(<Die number={0} change={true} changeFunction={(status, index) => this.saveDie(status, index)}/>)
    })
    
  }


  render(){

    return (
      <>
        <div className='dice'>{this.state.dice}</div>
        <button onClick={() => this.getDice()}>Roll</button>
        <br></br><br></br>
        <Player values={this.state.diceNumbers} reset={() => this.reset()} moved={() => this.moved()}/>
        
      </>
    );
  }
}




