import React from 'react'

export class LowerSection extends React.Component{
    
    render(){
        // console.log(this.props.data.score);
        return(
            <div><button onClick={() => this.props.onClick()}>{this.props.data.key} : {this.props.data.score}</button></div>
        )
    }
}