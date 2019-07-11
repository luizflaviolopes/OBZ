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
              top: window.pageYOffset + 60,
              left: "0",
              right: 0,
              margin: "auto",
              width: "75%",
              padding: "0.7rem",
              zIndex:2,
            }}
          >
            <div
              className="card-header"
              style={{ backgroundColor: this.props.color.fill, color: this.props.color.text }}
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
                <span>Resumo:</span>
              </div>
              <p>{this.props.resumo}</p>
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
            <div className="card-footer">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                aria-label="Add"
                onClick={() => this.props.sendToStack(this.props.grupment)}
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
              style={{ backgroundColor: this.props.color.fill, color: this.props.color.text }}
            >
              <h4>{this.props.unAdm}</h4>
            </div>

            <div className="card-body">
              <p>{this.props.entrega}</p>
              <p>R$ {isNaN(this.props.valorTotal)? "indefinido": parseFloat(this.props.valorTotal).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</p>
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
            <div className="card-tab" style={{color:this.props.color.fill}}>
            {this.props.unAdm}
            </div>
            <div
              className="card-header"
              style={{ backgroundColor: this.props.color.fill, color: this.props.color.text }}
            >
              <h4>{this.props.entrega}</h4>
            </div>

            <div className="card-body">
              <p>{this.props.resumo}</p>
              <p>R$ {isNaN(this.props.valorTotal)? "indefinido": parseFloat(this.props.valorTotal).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}</p>
            </div>
          </Paper>
        </Grid>
      );
    }
  }
}
