import React from 'react'
import {Scorecard} from './Scorecard'

export class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            upperscore: 0
        }
    }
    upperScore(score){
        this.setState({
            upperscore: score
        })
    }
    lowerScore(score){
        this.setState({
            lowerscore: score
        })
    }

    reset(){
        this.setState({
            upperscore: 0,
            lowerscore: 0
        })
        this.props.reset();
    }

    render(){
        return(
            <>
                <Scorecard 
                values={this.props.values} 
                reset={() => this.reset()}
                moved={() => this.props.moved()}
                upperScore = {(score) => this.upperScore(score)}
                lowerScore = {(score) => this.lowerScore(score)}
                />
            </>
        )
    }
}