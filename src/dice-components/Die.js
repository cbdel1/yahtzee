import React from 'react'
import './die-styles.css'
import one from '../resources/one.png'
import two from '../resources/two.png'
import three from '../resources/three.png'
import four from '../resources/four.png'
import five from '../resources/five.png'
import six from '../resources/six.png'
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export class Die extends React.Component {
    getDiceImg(number){
        let image = '';
        switch (number) {
            case 1:
                image = (<img src={one} alt="1"  height="100px" width="100px" />)
                break;
            case 2:
                image = (<img src={two} alt="1" height="100px" width="100px"/>)
                break;
            case 3:
                image = (<img src={three} alt="1" height="100px" width="100px"/>)
                break;
            case 4:
                image = (<img src={four} alt="1" height="100px" width="100px"/>)
                break;

            case 5:
                image = (<img src={five} alt="1" height="100px" width="100px"/>)
                break;
            case 6:
                image = (<img src={six} alt="1" height="100px" width="100px"/>)
                break;
            
            default:
                break;
        }
        return image;
    }
    render(){        
        return (
            <div className={this.props.classSelect} 
            number={this.props.number} 
            change={this.props.change} 
            index={this.props.index} 
            onClick={() => this.props.changeFunction(this.props.index)}>
                {this.getDiceImg(this.props.number)}
            </div>
        )
    }
}
