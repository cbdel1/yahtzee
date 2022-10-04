import React, {useState} from 'react'
import {Sections} from './Sections';

export const Player = (props) => {
    const name = props.name;
    const data = testData();
    const {lowerTotal, setLowerTotal} = useState(0);
    const {upperTotal, setUpperTotal} = useState(0);

    const grandTotal = getTotal(data);
  return (
    <>
        <div>Player: {props.name}</div>
        <Sections data={data.upper} total={setUpperTotal}/>
        <Sections data={data.lower} total={setLowerTotal}/>
        <div>Grand Total: {grandTotal}</div>
    </>
  )
}


function testData(){
  const data = {upper: { scores:
      {
        'ones' : 1,
        'twos' : 2,
        'threes': 3,
        'fours' : 4,
        'fives' : 5,
        'sixes' : 6
      }, sectionName: "Upper"
    },
    lower: { scores:
      {
        'three of a kind' : 6,
        'four of a kind' : 6,
        'small straight': 4,
        'large straight' : 3,
        'full house' : 2,
        'yahtzee' : 1
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