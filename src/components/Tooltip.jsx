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
          className="tooltip"
        >
          <div
            className="card-header"
            style={{ backgroundColor: this.props.color.fill }}
          >
            <h2>{this.props.unAdm}</h2>
          </div>
          <hr />
          <div className="card-propertie">
            <div>
              <span>Entrega:</span>
            </div>
            <p>{this.props.entrega}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Detalhamento:</span>
            </div>
            <p>{this.props.detalhamento}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Justificativa:</span>
            </div>
            <p>{this.props.justificativa}</p>
          </div>
          <div className="card-propertie">
            <div>
              <span>ItemCusto:</span>
            </div>
            <p>
              <ul>
                {this.props.itens.map(function(a, i) {
                  return (
                    <li>
                      {a.itemCusto} - R$ {a.valTot.toLocaleString()}
                    </li>
                  );
                })}
              </ul>
            </p>
          </div>
          <div className="card-propertie">
            <div>
              <span>Resumo:</span>
            </div>
            <p>{this.props.resumo}</p>
          </div>
          <div className="card-propertie price">
            <div>
              <span>PrecoTotal:</span>
            </div>
            <p>{this.props.precoTotal}</p>
          </div>
          <hr />
          <div className="card-footer" />
        </Paper>
      </Grid>
    );
  }
}
