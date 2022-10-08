import React from 'react'

export class LowerSection extends React.Component{
    render(){
        return(
         <>
            <div className='section-lines'>
                <div className='hidden help-text' id={this.props.data.section}>{this.props.data.desc}
                    <span className='help-text-bottom'></span>
                </div>
                <em><b>{this.props.data.key} : </b></em>
                    <input type="button" disabled={this.props.data.score ? true : false} className='sectionChoices' onClick={() => this.props.onClick()} value={this.props.data.score}/>
            </div>
         </>
        )
    }
}