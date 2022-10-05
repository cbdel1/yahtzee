import React from 'react'
import {LowerSection} from './LowerSection'
import {UpperSection} from './UpperSection'

export class Scorecard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialState: [{
          UpperSection: [
                { section: 'ones', value: 1, score: null, key: 'ones'},
                { section: 'twos', value: 2, score: null, key: 'twos' },
                { section: 'threes', value: 3, score: null, key: 'threes' },
                { section: 'fours', value: 4, score: null, key: 'fours' },
                { section: 'fives', value: 5, score: null, key: 'fives' },
                { section: 'sixes', value: 6, score: null, key: 'sixes' },
              ],
          LowerSection: [
                { section: '3OfAKind', score: 0, key: '3OfAKind' },
                { section: '4OfAKind',  score: 0, key: '4OfAKind' },
                { section: 'FullHouse', score: 0, key: 'FullHouse' },
                { section: 'SmStraight', score: 0, key: 'SmStraight' },
                { section: 'LgStraight', score: 0, key: 'LgStraight' },
                { section: 'Yahtzee', score: 0, key: 'Yahtzee' },
              ],
              upperScore: 0,
              lowerScore: 0,
              totalScore: 0,
              upperTotalScore:0,
              upperBonus: 0
        }],
        stepNumber: 0,
        moved: true,
        dice: []
      };
    }
  
    setUpperScore(i){
      if(this.props.values[0] !== 0){
        const values = this.props.values;
        const history = this.state.initialState.slice(0, this.state.stepNumber + 1);
        const current = JSON.parse(JSON.stringify(history[history.length-1]));
        const next = {...current};
        let score = next.upperScore;
        let shouldUpdate = false;

        current.UpperSection.forEach(sect => {
          if(sect.score === null && sect.section === i){
            shouldUpdate = true;
          }
        })
        if(shouldUpdate && values !== this.state.dice){
          next.UpperSection.forEach(sect => {
              score += checkSelected(sect, i, values);
          })
          
            next.upperScore = score;
            if(score >= 35){
              next.upperTotalScore = score+35;
              next.upperBonus = 35;
            } else {
              next.upperTotalScore = score;
            }
            history.push(next)
            this.setState({
              initialState: history,
              stepNumber: history.length-1,
              moved: false,
              dice: values,
            })
            this.props.moved();
        }
      }
    }

    // setLowerScore(i){
    //  const section = this.state.initialState[this.state.play];
    //  const values = this.props.values;
    //  let score = this.state.initialState[this.state.play].totalScore;
     
    //  section.LowerSection.forEach(sect => {
    //    score += checkSelected(sect, i, values);
    //   })
      
    //   this.setState({
    //     initialState: section,
    //     lowerScore: score,
    //   })
    // }

    renderSection(data, section){
      let lines = [];

      if(section === "upper"){
        data.forEach(element => {
          lines.push(<UpperSection data={element} onClick={() => this.setUpperScore(element.section)}/>)
        });
      } else {
        data.forEach(element => {
          lines.push(<LowerSection data={element} onClick={() => this.setLowerScore(element.section)}/>)
        });
      }
      return(
        lines
      )
    }

    backInTime(index){
      this.setState({
        stepNumber: index,
      })
    }

    showHistory(){
      
      const history = this.state.initialState;
      const moves = history.length-1;
      let historyButtons = [];

      for(let i=0; i<=moves; i++){
        historyButtons.push(<button onClick={() => this.backInTime(i)}>{i}</button>);
      }
      return historyButtons;
    }

    reset(){
      const initialState = this.state.initialState[0];
      this.setState({
        initialState: [initialState],
        stepNumber: 0,
      })
      this.props.reset();
    }

  render(){
    const data = this.state.initialState;
    const current = data[this.state.stepNumber];
   
    return (
      <>
        <div>{this.renderSection(current.UpperSection, "upper")}</div>
        <div>Upper Subtotal: {current.upperScore}</div>
        <div>Upper Bonus: {current.upperBonus}</div>
        <div>Upper Total: {current.upperTotalScore}</div>
        
        {/* <div>{this.renderSection(this.state.initialState.LowerSection)}</div> */}
        {/* <div>Lower Total: {this.state.lowerScore}</div> */}
        <h4>Total Score: {current.upperTotalScore + current.lowerScore}</h4>
        <br></br>
        <div><button onClick={() => this.reset()}>Reset</button></div>
        <br></br>
        <div>History: {this.showHistory()}</div>
      </>
    )
  }
}

function checkSelected(sect, i, values){
  let score = 0;
  if(sect.section === i && sect.score == null){
    values.forEach(die => {
      if(die === sect.value){
        score += die;
      } else if(die === 0){
        score = null;
      }
    })
    sect.score = score;
  } 
  return score;
}