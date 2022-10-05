import React from 'react'
import {Scorecard} from './Scorecard'

export class Player extends React.Component{
    render(){
        return(
            <>
                <Scorecard toUpdate={5} selected={this.props.selected} values={this.props.values}/>
            </>
        )
    }
}