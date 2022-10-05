import React from 'react'
import {Scorecard} from './Scorecard'

export class Player extends React.Component{

    render(){
        return(
            <>
                <Scorecard 
                values={this.props.values} 
                reset={() => this.props.reset()}
                moved={() => this.props.moved()}
                />
            </>
        )
    }
}