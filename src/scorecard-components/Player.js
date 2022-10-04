import React from 'react'
import {Sections} from './Sections';

export class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      upperTotal: 0,
      lowerTotal: 0,
      data: this.props.player === 1 ? testData1() : testData2(),
      
    }
    let grandTotal = 0;
  }

  updateVal(dat){
    
    const updatedSection = Object.assign({}, this.state.data);
    const section = dat.sectionName.toLowerCase();
    updatedSection[section].scores = dat.scores;
    console.log(updatedSection);
    this.setState({
      data: updatedSection
    })
  
  }

  renderSection(sec){
    let sectionData = this.state.data[sec];
    let curTotal = totalSection(this.state.data[sec].scores);
    if(sec === 'upper'){
      this.setState({
        upperTotal: curTotal,
      })
    } else {
      this.setState({
        lowerTotal: curTotal,
      })
    }
    return(
      <Sections data={sectionData} 
        section={sec} 
        sectionTotal={curTotal} 
        updateVal={(data)=> {this.updateVal(data)}}
      />
    )
  }

  render(){
    return (
      <>
        <div>Player Name:{this.props.name}</div>
        {this.renderSection("upper")}
        {this.renderSection("lower")}
        <div>Grand Total: {this.state.grandTotal}</div>
      </>
    )
  }
}


function testData1(){
  const data = {upper: { scores:
      {
        ones : 1,
        twos : 2,
        threes: 3,
        fours : 4,
        fives : 5,
        sixes : 6
      }, sectionName: "Upper"
    },
    lower: { scores:
      {
        threeofakind : 1,
        fourofakind :1,
        smallstraight: 1,
        largestraight : 1,
        fullhouse : 1,
        yahtzee : 1
      }, sectionName: "Lower",
    }
  }

  return data;
}

function testData2(){
  const data = {upper: { scores:
      {
        ones : 1,
        twos : 1,
        threes: 1,
        fours : 1,
        fives : 1,
        sixes : 1
      }, sectionName: "Upper"
    },
    lower: { scores:
      {
        threeofakind : 1,
        fourofakind : 1,
        smallstraight: 1,
        largestraight : 1,
        fullhouse : 1,
        yahtzee : 1
      }, sectionName: "Lower",
    }
  }

  return data;
}

function getTotal(data){
  const allScores = {...data.upper.scores, ...data.lower.scores};
  let total = 0;
  Object.values(allScores).forEach(score =>{
    total += score;
  })
  return total;
}

function totalSection(scores){
  let total = 0;
  Object.values(scores).forEach(score =>{
    total += score;
  })
  return total;
}