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
    api.get("http://localhost:5000/api/unidade").then(res => {
      console.log(res);
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
          flexDirection: "row",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.unidades.map(function(a, i) {
          return (
            <Chip
              avatar={<Avatar style={{ width: "auto" }}>{a.sigla}</Avatar>}
              label={a.nome}
              clickable
              color="primary"
              onDelete={null}
              deleteIcon={<DoneIcon />}
              variant="outlined"
              style={{ margin: "0.5rem" }}
              onClick={() => _this.handleClick(a.sigla)}
            />
          );
        })}
      </div>
    );
  }
}
