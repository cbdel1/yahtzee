import React from 'react'
import './die-styles.css'

export class Die extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            change: this.props.change,
            number: this.props.number,
            classSelect: 'die '
        }
    }

    noChange(){
        const changeStatus = this.state.change;
        let classSelect = this.state.classSelect;
        
        if(changeStatus === false){
            classSelect = 'die ';
        } else {
            classSelect = 'die save';
        }
        
        this.setState({
            change: changeStatus ? false : true,
            classSelect: classSelect,
        })
        this.props.changeFunction(this.state.change, this.props.index);
    }

    render(){
        let classNames = '';
        if(this.props.number === 0){
            this.setState({
                classSelect: 'die '
            })
        } else {
            classNames = this.state.classSelect;
        }
        
        return (
            <span className={classNames} change={this.props.change} onClick={() => this.noChange()}>{this.props.number}</span>
        )
    }
}
