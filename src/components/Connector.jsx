import React from "react";
import ReactDOM from 'react-dom';

export class Connector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidUpdate(){
    console.log("upd");
  }

  resize = () => {
    this.forceUpdate();
    }
    componentDidMount(){
      window.addEventListener('resize', this.resize)
    }
        
    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }

  render() {

    const {starta, enda} = this.props

    let start = starta
    .getBoundingClientRect();

    let end = enda
    .getBoundingClientRect()

    let positions = {
      x1: start.x + start.width/2,
      x2: end.x +end.width/2,
      y1: start.y,
      y2: end.y +(end.height),
    }

    let middle = (positions.y2- positions.y1)/2

    let linePoint = [];
    let startPoint;

    startPoint = {x:positions.x1,y:positions.y1};
    linePoint.push({x:positions.x1,y:positions.y1+middle});
    linePoint.push({x:positions.x2,y:positions.y1+middle});
    linePoint.push({x:positions.x2,y:positions.y2});
    
    return (

            <path  d={'M '+ startPoint.x + ' ' + startPoint.y  + linePoint.reduce((a,b) =>{return a + ' L'+ b.x + ' ' + b.y },'') } style={{stroke:"steelblue",strokeWidth:2, fill: 'none'}}  />
    );
  }
}
