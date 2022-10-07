import React from 'react'

export class UpperSection extends React.Component{
    render(){
        return(
            <div><button onClick={() => this.props.onClick()}>{this.props.data.section} : {this.props.data.score}</button></div>
        )
    }
}