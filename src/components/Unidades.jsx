import React from "react";
import { Chip, Avatar } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import api from "../Services/Api";

export class Unidades extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unidades: [] };
  }

  componentDidMount() {
    api.get("/api/unidade").then(res => {
      if (res) this.setState({ unidades: res.data });
    });
  }

  handleClick(un) {
    this.props.history.push("/Stack/" + un);
  }

  render() {
    let _this = this;
    return (
      <div
        className="vertical-center"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div  style={{    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'end',}}>
        {this.state.unidades.map(function(a, i) {
          return (
              <div
              onClick={() => _this.handleClick(a.sigla)}
              style={{border:'1px solid steelblue', borderRadius:'10px', overflow:'hidden', margin:'5px', cursor:'pointer'}}
              >
<div style={{background:'steelblue', display:'inline-block', padding:'5px'}}><span>{a.sigla}</span></div>
  <div style={{display:'inline-block', padding:'5px'}}><span>{a.nome}</span></div>

              </div>



            /*<Chip
              avatar={
                <Avatar style={{ width: "auto", minWidth: "2rem" }}>
                  
                </Avatar>
              }
              label={a.nome}
              clickable
              color="primary"
              onDelete={null}
              deleteIcon={<DoneIcon />}
              variant="outlined"
              style={{ margin: "0.5rem" }}
              onClick={() => _this.handleClick(a.sigla)}
            />*/
          );
        })}
        </div>
      </div>
    );
  }
}
