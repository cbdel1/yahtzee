import React from 'react'
import {LowerSection} from './LowerSection'
import {UpperSection} from './UpperSection'
import * as $ from 'jquery'

import './scorecard-styles/scorecard.css'


export class Scorecard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialState: [{
          UpperSection: [
                { section: 'ones', value: 1, score: null, key: 'ones', desc: "Add all ones"},
                { section: 'twos', value: 2, score: null, key: 'twos', desc: "Add all twos" },
                { section: 'threes', value: 3, score: null, key: 'threes', desc: "Add all threes" },
                { section: 'fours', value: 4, score: null, key: 'fours', desc: "Add all fours" },
                { section: 'fives', value: 5, score: null, key: 'fives', desc: "Add all fives" },
                { section: 'sixes', value: 6, score: null, key: 'sixes', desc: "Add all sixes" },
              ],
          LowerSection: [
                { section: '3Kind', score: null, key: '3 Of A Kind', desc: "Total all dice"  },
                { section: '4Kind',  score: null, key: '4 Of A Kind', desc: "Total all dice"  },
                { section: 'FullHouse', score: null, key: 'Full House', desc: "3 of a kind and 2 of a kind. 25 Points"  },
                { section: 'SmStraight', score: null, key: 'Small Straight', desc: "Add all sixes"  },
                { section: 'LgStraight', score: null, key: 'Large Straight', desc: "Add all sixes"  },
                { section: 'Yahtzee', score: null, key: 'Yahtzee', desc: "Add all sixes"  },
                { section: 'Chance', score: null, key: 'Chance', desc: "Add all sixes"  },
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
            this.props.upperScore(next.upperTotalScore);
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


    setLowerScore(i){
      if(this.props.values[0] !== 0){
        const values = this.props.values;
        const history = this.state.initialState.slice(0, this.state.stepNumber + 1);
        const current = JSON.parse(JSON.stringify(history[history.length-1]));
        const next = {...current};
        let score = next.lowerScore;
        let shouldUpdate = false;

        current.LowerSection.forEach(sect => {
          if(sect.score === null && sect.section === i){
            shouldUpdate = true;
          }
        })

        if(shouldUpdate && values !== this.state.dice){
            const sect = next.LowerSection.find((row => row.section===i));
              score += checkLowerSelected(sect, i, values);
          
            
            next.lowerScore = score;
            next.lowerTotalScore = score;
            this.props.lowerScore(next.lowerTotalScore);
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
      <div className='scorecard'>
          <div className='section' id="upperSection">
            
              <div className='section-info'>
                <div class="section-lines-container">{this.renderSection(current.UpperSection, "upper")}
                <div className='section-lines'><em><b>Subtotal: </b></em><input type="button" className='sectionChoices' disabled value={current.upperScore}/></div>
                <div className='section-lines'><em><b>Bonus: </b></em><input type="button" className='sectionChoices' disabled value={current.upperBonus}/></div>
                <div className='section-lines'><em><b>Upper Total: </b></em><input type="button" className='sectionChoices' disabled value={current.upperTotalScore}/></div>
                </div>
              </div>
              
          </div>

          <hr></hr>
          <div className='section' id="lowerSection">
            <div className='section-info'>
            <div class="section-lines-container">
              {this.renderSection(current.LowerSection)}
              <div className='section-lines'><em><b>Lower Total: </b></em><input type="button" className='sectionChoices' disabled value={current.lowerScore}/></div>
              </div>
            </div>
          </div>
          <br></br>
          <div className='bottom-scorecard'>
            <h4>Total Score: {current.upperTotalScore + current.lowerScore}</h4>
            <div><button onClick={() => this.reset()}>Reset</button></div>
            <div>History: {this.showHistory()}</div>
          </div>
        </div>
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

function checkLowerSelected(sect, i, values){
  let score = 0;
  let countArr = {};
  if(sect.section === i && sect.score === null){
    switch (sect.section) {
      case "3Kind":
        countArr = values.reduce((initialValue, nextValue) => {
          return initialValue[nextValue] ? ++initialValue[nextValue] : initialValue[nextValue] = 1, initialValue;
        }, {});
          
          function isthreeKind(element, index, array){
            return element >= 3;
          }
          if(Object.values(countArr).some(isthreeKind)){
            let total = values.reduce((initialValue, nextValue) => {
                return initialValue + nextValue;
              });
              score = total
          }
        break;
      case "4Kind":
        countArr = values.reduce((initialValue, nextValue) => {
          return initialValue[nextValue] ? ++initialValue[nextValue] : initialValue[nextValue] = 1, initialValue;
        }, {});
          
          function isFourKind(element, index, array){
            return element >= 4;
          }
          if(Object.values(countArr).some(isFourKind)){
            let total = values.reduce((initialValue, nextValue) => {
                return initialValue + nextValue;
              });
              score = total
          }
        break;
      case "FullHouse":
        countArr = values.reduce((initialValue, nextValue) => {
          return initialValue[nextValue] ? ++initialValue[nextValue] : initialValue[nextValue] = 1, initialValue;
        }, {});
          
          function isFullHouse2(element, index, array){
            return element === 2;
          }
          function isFullHouse3(element, index, array){
            return element === 3;
          }

          if(Object.values(countArr).some(isFullHouse2) && Object.values(countArr).some(isFullHouse3)){
              score = 25
          }
        break;

      case "SmStraight":
        let newValues = [...new Set(values)].sort();
       
        score = newValues.length >= 4 ? 30 : 0;
        break;

      case "LgStraight":
        let newLgValues = [...new Set(values)].sort();

        score = newLgValues.length === 5 ? 40 : 0;
        break;

      case "Yahtzee":
        countArr = values.reduce((initialValue, nextValue) => {
          return initialValue[nextValue] ? ++initialValue[nextValue] : initialValue[nextValue] = 1, initialValue;
        }, {});
          
        if(Object.keys(countArr).length === 1){
          score = 50;
        }
        break;

      case "Chance":
        let total = values.reduce((initialValue, nextValue) => {
          return initialValue + nextValue;
        });
        score = total
        break;

      default:
        break;
    }
  }
  sect.score = score;
  return score;
}