import React from "react";
import "../css/Cards.css";
import { Grid, Paper, Button } from "@material-ui/core";
import Send from "@material-ui/icons/Send";

export class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
    this.handleClickToggle = this.handleClickToggle.bind(this);
  }

  handleClickToggle() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    if (this.state.opened) {
      return (
        <Grid item className="card-decision">
          <div className="backdrop" onClick={this.handleClickToggle} />
          <Paper
            elevation={1}
            style={{
              position: "absolute",
              top: "4rem",
              left: "0",
              right: 0,
              margin: "auto",
              width: "60%",
              padding: "0.7rem"
            }}
          >
            <div
              className="card-header"
              style={{ backgroundColor: this.props.color.fill }}
            >
              <h2>{this.props.UnidadeAdmin}</h2>
            </div>
            <hr />
            <div className="card-propertie">
              <span>Entrega:</span>
              <span>{this.props.Entrega}</span>
            </div>
            <div className="card-propertie">
              <span>Detalhamento:</span>

              <span>{this.props.Detalhamento}</span>
            </div>
            <div className="card-propertie">
              <span>Justificativa:</span>
              <span>{this.props.Justificativa}</span>
            </div>
            <div className="card-propertie">
              <span>ItemCusto:</span>
              <span>{this.props.ItemCusto}</span>
            </div>
            <div className="card-propertie">
              <span>Resumo:</span>
              <span>{this.props.Resumo}</span>
            </div>
            <div className="card-propertie price">
              <span>PrecoTotal:</span>
              <span>{this.props.PrecoTotal}</span>
            </div>
            <hr />
            <div className="card-footer">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                aria-label="Add"
                onClick={() => this.props.sendToStack(this.props.Entrega)}
              >
                Selecionar
                <Send className="button-icon" />
              </Button>
            </div>
          </Paper>
          <Paper
            elevation={1}
            onClick={this.handleClickToggle}
            className="card-content"
          >
            <div
              className="card-header"
              style={{ backgroundColor: this.props.color.fill }}
            >
              <h4>{this.props.Entrega}</h4>
            </div>

            <div className="card-body">
              <p>{this.props.Resumo}</p>
              <p>({this.props.PrecoTotal})</p>
            </div>
          </Paper>
        </Grid>
      );
    } else {
      return (
        <Grid item className="card-resume">
          <Paper
            elevation={1}
            onClick={this.handleClickToggle}
            className="card-content"
          >
            <div
              className="card-header"
              style={{ backgroundColor: this.props.color.fill }}
            >
              <h4>{this.props.Entrega}</h4>
            </div>

            <div className="card-body">
              <p>{this.props.Resumo}</p>
              <p>({this.props.PrecoTotal})</p>
            </div>
          </Paper>
        </Grid>
      );
    }
  }
}
