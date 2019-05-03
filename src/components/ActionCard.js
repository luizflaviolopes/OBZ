import React from "react";
import "../css/Cards.css";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import Send from '@material-ui/icons/Send'

export class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false }
    this.handleClickToggle = this.handleClickToggle.bind(this);
  }


  handleClickToggle() {
    this.setState({ opened: !this.state.opened })
  }


  render() {
    if (this.state.opened) {
      return (
        <Grid item className="card-decision">
          <div className="backdrop" onClick={this.handleClickToggle}></div>
          <Paper elevation={1} style={{ position: "absolute", top: "4rem", left: "0", right: 0, margin: "auto", width: "60%" }}>
            <h4>
              {this.props.UnidadeAdmin}
            </h4>
            <hr />
            <p>{this.props.Entrega}</p>
            <p>({this.props.PrecoTotal})</p>
            <hr />
            <Button variant="contained" size="medium"
              color="primary"
              aria-label="Add"
              onClick={() => this.props.sendToStack(this.props.Entrega)}
            >
              Selecionar
              <Send className="button-icon" />
            </Button>
          </Paper>
          <Paper elevation={1} onClick={this.handleClickToggle} className="card-content">
            <h4>
              {this.props.UnidadeAdmin}
            </h4>
            <hr />
            <p>{this.props.Entrega}</p>
            <p>({this.props.PrecoTotal})</p>
          </Paper>
        </Grid>
      );
    }
    else {
      return (
        <Grid item className="card-decision">
          <Paper elevation={1} onClick={this.handleClickToggle} className="card-content">
            <h4>
              {this.props.UnidadeAdmin}
            </h4>
            <hr />
            <p>{this.props.Entrega}</p>
            <p>({this.props.PrecoTotal})</p>
          </Paper>
        </Grid>
      );
    }
  }
}
