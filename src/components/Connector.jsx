import React from "react";
import ReactDOM from 'react-dom';

export class Connector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount(){
    const {start, end} = this.props

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

  this.setState({...positions, linePoints: linePoint, startPoint: startPoint, ready: true});
}

  render() {
    
    if(!this.state.ready)
    return null;

    return (

            <path  d={'M '+ this.state.startPoint.x + ' ' + this.state.startPoint.y  + this.state.linePoints.reduce((a,b) =>{return a + ' L'+ b.x + ' ' + b.y },'') } style={{stroke:"steelblue",strokeWidth:2, fill: 'none'}}  />
    );
  }
}
