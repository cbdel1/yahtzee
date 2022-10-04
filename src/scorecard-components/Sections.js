import React, {useContext}  from 'react'
import {Values} from './Values'

export const Sections = (props) => {
  const data = props.data;
  const values = [];
  let sectionTotal = totalSection(data.scores);

  Object.keys(data.scores).forEach((k) => {
    values.push(<Values sectionValue={k} score={data.scores[k]}/>);
  });
  
  return (
   
      <table>
        <tbody>
        <tr><th>{data.sectionName} Section</th><th>Score</th></tr>
        {values}
        <tr><th>{data.sectionName} Section Total: {sectionTotal}</th></tr>
        </tbody>
      </table>
    
  )
}

function totalSection(scores){
  let total = 0;
  Object.values(scores).forEach(score =>{
    total += score;
  })
  return total;
}
