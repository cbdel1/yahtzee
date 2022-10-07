import React from 'react'
import img from '../resources/info-button.jpg'

export class UpperSection extends React.Component{
    render(){
        return(
            <>
            <div className='section-lines'>
                <em><b>{this.props.data.section} : </b></em>
                    <input type="button" disabled={this.props.data.score ? true : false} className='sectionChoices' onClick={() => this.props.onClick()} id={this.props.data.score} value={this.props.data.score} />
            </div>
            </>
        )
    }
}