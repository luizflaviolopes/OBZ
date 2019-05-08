import React from "react";
import "../css/Tooltip.css";
import { Grid, Paper } from "@material-ui/core";

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid item className="card-decision">
        <div className="backdrop" onClick={this.props.onClose} />
        <Paper
          elevation={1}
          style={{
            position: "absolute",
            top: this.props.element.getBoundingClientRect().y,
            left: "0",
            right: 0,
            margin: "auto",
            width: "60%",
            padding: "0.7rem",
            transform: "translateY(-40%)"
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
            <div>
              <span>Entrega:</span>
            </div>
            <p>{this.props.Entrega}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Detalhamento:</span>
            </div>
            <p>{this.props.Detalhamento}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Justificativa:</span>
            </div>
            <p>{this.props.Justificativa}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>ItemCusto:</span>
            </div>
            <p>{this.props.ItemCusto}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Resumo:</span>
            </div>
            <p>{this.props.Resumo}</p>
          </div>
          <div className="card-propertie price">
            <div>
              <span>PrecoTotal:</span>
            </div>
            <p>{this.props.PrecoTotal}</p>
          </div>
          <hr />
          <div className="card-footer" />
        </Paper>
      </Grid>
    );
  }
}
