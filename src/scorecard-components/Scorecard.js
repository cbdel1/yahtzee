import React from 'react'
import {LowerSection} from './LowerSection'
import {UpperSection} from './UpperSection'

export class Scorecard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialState: {
          UpperSection: [
                { section: 'ones', value: 1, score: 0 },
                { section: 'twos', value: 2, score: 0 },
                { section: 'threes', value: 3, score: 0 },
                { section: 'fours', value: 4, score: 0 },
                { section: 'fives', value: 5, score: 0 },
                { section: 'sixes', value: 6, score: 0 },
              ],
          LowerSection: [
                { section: '3OfAKind', score: 0 },
                { section: '4OfAKind',  score: 0 },
                { section: 'FullHouse', score: 0 },
                { section: 'SmStraight', score: 0 },
                { section: 'LgStraight', score: 0 },
                { section: 'Yahtzee', score: 0 },
              ]
        },
        upperScore: 0,
        lowerScore: 0,
        totalScore: 0,
      };
    }
  
    setUpperScore(i){
     const section = this.state.initialState;
     const values = this.props.values;
     let score = this.state.upperScore;
      section.UpperSection.forEach(sect => {
        if(sect.section === i && this.props.selected === i && sect.score === 0){
          values.forEach(die => {
            if(die === sect.value){
              sect.score += die;
            }
          })
          score += sect.score;
        }
      })

      this.setState({
        initialState: section,
        upperScore: score,
      })
    }
    setLowerScore(i){
     const section = this.state.initialState;
     let score = 0;
      section.LowerSection.forEach(sect => {
        if(sect.section === i){
          sect.score += this.props.toUpdate;
        }
        score += sect.score;
      })

      this.setState({
        initialState: section,
        lowerScore: score,
      })
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

  render(){
    return (
      <>
        <div>{this.renderSection(this.state.initialState.UpperSection, "upper")}</div>
        <div>Upper Total: {this.state.upperScore}</div>
        <div>{this.renderSection(this.state.initialState.LowerSection)}</div>
        <div>Lower Total: {this.state.lowerScore}</div>
        <h4>Total Score: {this.state.upperScore + this.state.lowerScore}</h4>
      </>
    )
  }
}


