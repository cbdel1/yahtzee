import React from 'react'
import './die-styles.css'

export class Die extends React.Component {
    render(){        
        return (
            <div className={this.props.classSelect} 
            number={this.props.number} 
            change={this.props.change} 
            index={this.props.index} 
            onClick={() => this.props.changeFunction(this.props.index)}>
                {this.props.number}
            </div>
        )
    }
}
