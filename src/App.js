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
      dice: [[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}]],
      diceNumbers: Array(6).fill(0),
      rollNumber: 0,
      moved: false
    }
  }


  renderDice(i){
    let dice = (<Die 
        classSelect={this.state.dice[i][0].classSelect} 
        number={this.state.dice[i][0].number}
        change={this.state.dice[i][0].change}
        index={i}
        changeFunction={() => this.saveDie(i)}
        />)
    return dice;
  }
  
  moved(){
    let diceInfo = this.state.dice.slice();
    diceInfo.forEach(ele => {
      ele[0].change = true;
      ele[0].classSelect = 'die';
    })
    this.setState({
      dice: diceInfo,
      moved: true,
      rollNumber: 0

    })
    
  }

  saveDie(index){
    if(this.state.rollNumber < 3 && this.state.moved === false && this.state.rollNumber > 0){
      let diceInfo = this.state.dice.slice();
      let toChange = diceInfo[index][0];

      toChange.change = !toChange.change;
      toChange.classSelect = toChange.change===true ? 'die': 'die save';
      diceInfo[index][0] = toChange;

      this.setState({
        dice: diceInfo
      })
    }
  }

  getDice(){
    let diceInfo = this.state.dice.slice();
    let rollNumber = this.state.rollNumber;
    let diceNumbers = [];
    let moved = this.state.moved;

    if(moved === true){
      moved = false;
    }

    if(rollNumber+1 <= 3 && moved === false){
      for(let i=0; i < diceInfo.length; i++){
        let newNumber = Math.floor(Math.random() * 6 + 1);
        if(diceInfo[i][0].change === true){
          diceInfo[i][0].number = newNumber;
        }
        diceNumbers.push(diceInfo[i][0].number);
      }
      rollNumber++;

      
      this.setState({
        dice: diceInfo,
        diceNumbers: diceNumbers,
        rollNumber: rollNumber,
        moved: moved
      })
    }
    
   
  }

  reset(){
    this.setState({
      dice: [[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}],[{"classSelect": "die", "number": 0, "change": true}]],
      rollNumber: 0,
      moved: false,
      diceNumbers: Array(6).fill(0),
    })
    
  }

  render(){
    let diceInfo = this.state.dice;
    let allDice = [];
    for(let i=0; i<diceInfo.length; i++){
      allDice.push(this.renderDice(i))
    }
    return (
      <>
        <div>Roll number: {this.state.rollNumber}</div>
        <div className='dice'>
          {allDice}
          </div>
        <button onClick={() => this.getDice()}>Roll</button>
        <br></br><br></br>
        <Player values={this.state.diceNumbers} reset={() => this.reset()} moved={() => this.moved()}/>
        
      </>
    );
  }
}


$(function(){

})