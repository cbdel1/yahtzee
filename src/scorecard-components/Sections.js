import React from 'react'
import {Values} from './Values'

export class Sections extends React.Component {


  updateValue(key) {
    let updateData = Object.assign({}, this.props.data);
    
    Object.keys(updateData.scores).forEach(k => {
      if(k === key['k'].toString()) {
        updateData.scores[k] += 5;
      }
    });
    this.props.updateVal(updateData);
  }

  renderValues(data){
    let sectionData = [];
    let scores = data.scores
    Object.keys(scores).forEach((k) => {
      sectionData.push(<>
        <div>
          {k} <Values score={scores[k]} keyValue={k} onClick={() => this.updateValue({k})}/>
        </div>
      </>)
    })
    return(
      sectionData
    )
  }
  render(){
    return (
        <>
        <div>
          {this.renderValues(this.props.data)}
        </div>
        <div>
          {this.props.section} Total: {this.props.sectionTotal}
        </div>
        <br></br>
        </>
    )
  }
}