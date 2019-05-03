import React from "react";
import { data } from "../Json";
import { ActionCard } from "./ActionCard";
import { Grid } from "@material-ui/core";
import { SelectionDisk } from "./SelectionDisk";
import '../css/svg.css'

var d = data;
window.dados = d;

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export class DynamicSelector extends React.Component {
  constructor(props) {
    super(props);
    let startData = groupBy(
      d.sort(function (a, b) {
        return a - b;
      }),
      "Entrega"
    );
    this.state = {
      initialData: startData,
      DataHistory: [{ toSelect: startData, selected: [] }]
    };
    this.getLastData = this.getLastData.bind(this);
    this.handleToStack = this.handleToStack.bind(this);
  }

  getLastData() {
    return this.state.DataHistory[this.state.DataHistory.length - 1];
  }

  handleToStack(item) {

    function generateColor() {
      let red = Math.floor(Math.random() * 255).toString();
      let green = Math.floor(Math.random() * 255).toString();
      let blue = Math.floor(Math.random() * 255).toString();

      let multiplier = 0.7;

      let redF = Math.floor(red * multiplier).toString();
      let greenF = Math.floor(green * multiplier).toString();
      let blueF = Math.floor(blue * multiplier).toString();


      return { fill: 'rgb(' + red + ',' + green + ',' + blue + ')', stroke: 'rgb(' + redF + ',' + greenF + ',' + blueF + ')' };

    }


    const history = this.state.DataHistory;
    let current = Object.assign({}, history[history.length - 1]);
    let toStack = current.toSelect[item].shift();
    current.selected.push(toStack);

    toStack.color = generateColor();

    if (current.toSelect[item].length === 0)
      delete current.toSelect[item];



    this.setState({ DataHistory: history.concat([current]) });

  }


  render() {
    let lastState = this.getLastData();
    let self = this;
    let objects = [];

    Object.keys(lastState.toSelect).forEach(function (i, a) {
      objects.push(lastState.toSelect[i][0]);
    });


    return (
      <Grid container spacing={0} direction={"row"} className="fullHeigth">
        <Grid item xs={8}>
          <Grid
            container
            spacing={0}
            className="item-selector"
            justify="center"
            direction="row"
          >
            <Grid container spacing={16}>
              {objects.map(function (i, a) {
                return <ActionCard {...i} sendToStack={self.handleToStack} chave={i.key} />;
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            spacing={0}
            justify="center"
            direction="column-reverse"
            className="fullHeigth"
          >
            <Grid item xs={12} className="fullHeigth">
              <svg height="100%" width="100%" viewBox="0 0 500 800" preserveAspectRatio="xMinYMin meet">
                <g style={{transform: "translate(170px,"+(300+lastState.selected.length*20)+"px)"}}>
                  {lastState.selected.map(function (i, a) {
                    return <SelectionDisk {...i} key={a} position={a} />;
                  })}
                </g>
              </svg>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
