import React from "react";
import "../css/Tooltip.css";
import { Grid, Paper } from "@material-ui/core";

export class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let dim = this.props.element.getBoundingClientRect();
    return (
      <Grid item className="card-decision">
        <div className="backdrop" onClick={this.props.onClose} />
        <Paper
          elevation={1}
          style={{
            position: "absolute",
            top: dim.y,
            right: window.innerWidth-dim.x+30,
            margin: "auto",
            width: "60%",
            padding: "0.7rem",
            transform: "translateY(-40%)",
            zIndex: 1005,
          }}
          className="tooltip"
        >
          <div
            className="card-header"
            style={{ backgroundColor: this.props.color.fill }}
          >
            <h2>{this.props.unStack || this.props.unAdm}</h2>
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
                <span>Classificacao:</span>
              </div>
              <p>{this.props.classificacao}</p>
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
                      {a.itemCusto} - R$ {isNaN(a.valTot)? "indefinido": parseFloat(a.valTot).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}
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
            <p>R$ {isNaN(this.props.valorTotal)? "indefinido": parseFloat(this.props.valorTotal).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</p>
          </div>
          <hr />
          <div className="card-footer" />
        </Paper>
      </Grid>
    );
  }
}
