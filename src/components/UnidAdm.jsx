import React from "react";
import ReactDOM from 'react-dom';

export class UnidAdm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:'flex'}
  this.chip = React.createRef();
  }

  componentDidMount(){
    if(!this.props.dummie)
    {
    this.props.obj.dom = ReactDOM.findDOMNode(this.chip.current);
    }
  }

  render() {
    if(this.props.dummie)
    {
      return (<div style={{display: 'flex',
      alignItems: 'center', opacity:0}}>
        <div
        style={{borderRadius:'10px', overflow:'hidden', margin:'5px', position:'relative', width:'10rem', height:'6rem'}}
        >
        </div>
        </div>)
    }


    const {onClick, sigla, nome} = this.props;

    return (
      <div style={{display: 'flex', justifyContent:'center', marginTop:'2rem'}} onMouseEnter={()=>this.setState({show:'none'})} onMouseLeave={()=>this.setState({show:'flex'})}>
        <div
        ref={this.chip}
        onClick={() => onClick(sigla)}
        style={{border:'1px solid steelblue', borderRadius:'10px', overflow:'hidden', margin:'5px', cursor:'pointer', position:'relative', width:'8rem', height:'5rem'}}
        >
        <div style={{background:'steelblue', display:'inline-block', position: 'absolute', width: '100%', height: '100%', display:this.state.show, alignItems:'center', justifyContent:'center', fontFamily:'Calibri', fontWeight:700, fontSize:'larger'}}><span>{sigla}</span></div>
        <div style={{display:'inline-block', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'small'}}><span>{nome}</span></div>
        </div>
        </div>
    );
  }
}
