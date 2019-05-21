import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { data } from "../Json";
import { ActionCard } from "./ActionCard";
import { Grid, Fab } from "@material-ui/core";
import { SelectionDisk } from "./SelectionDisk";
import "../css/svg.css";
import { FinalStack } from "./FinalStack";
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import { DragDropContext } from 'react-beautiful-dnd'

var d = data;
window.dados = d;

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class DynamicSelector extends React.Component {
  constructor(props) {
    super(props);

    function generateColor() {
      let red = Math.floor(Math.random() * 155 + 100).toString();
      let green = Math.floor(Math.random() * 155 + 100).toString();
      let blue = Math.floor(Math.random() * 155 + 100).toString();

      let multiplier = 0.7;

      let redF = Math.floor(red * multiplier).toString();
      let greenF = Math.floor(green * multiplier).toString();
      let blueF = Math.floor(blue * multiplier).toString();

      return {
        fill: "rgb(" + red + "," + green + "," + blue + ")",
        stroke: "rgb(" + redF + "," + greenF + "," + blueF + ")"
      };
    }

    let startData = groupBy(
      d.sort(function (a, b) {
        return a - b;
      }),
      "Entrega"
    );

    Object.keys(startData).forEach(function (a, i) {
      let Color = generateColor();

      startData[a].forEach(function (i, j) {
        i.color = Color;
      });
    });

    this.state = {
      initialData: startData,
      DataHistory: [{ toSelect: startData, selected: [] }],
      Backed: []
    };
    this.getLastData = this.getLastData.bind(this);
    this.handleToStack = this.handleToStack.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  undo() {
    console.log(this.state.DataHistory)
    if (this.state.DataHistory.length > 1) {
      let history = [...this.state.DataHistory]
      let toUndo = history.pop();
      console.log(history)
      this.setState({ DataHistory: history, Backed: this.state.Backed.concat(toUndo) });
    }
  }

  redo() {
    if (this.state.Backed.length > 0) {
      const history = this.state.DataHistory;
      let toRedo = this.state.Backed.pop();
      this.setState({ DataHistory: history.concat(toRedo) });
    }
  }

  getLastData() {
    return this.state.DataHistory[this.state.DataHistory.length - 1];
  }

  handleToStack(item) {
    let history = this.state.DataHistory;
    let c = history[history.length - 1];
    let current = { ...c };
    let toStack = current.toSelect[item].shift();
    current.selected = [...current.selected, toStack];

    if (current.toSelect[item].length === 0) delete current.toSelect[item];

    this.setState({ DataHistory: [...this.state.DataHistory, current], Backed: [] });
  }

  onDragEnd = () => {

  }

  render() {
    const { classes } = this.props;
    let lastState = this.getLastData();
    let self = this;
    let objects = [];
    console.log(lastState.selected)
    Object.keys(lastState.toSelect).forEach(function (i, a) {
      objects.push(lastState.toSelect[i][0]);
    });

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container spacing={0} direction={"row"} className="fullHeigth">
          <Grid item xs={8}>
            <Grid
              container
              spacing={0}
              className="item-selector"
              justify="center"
              direction="row"
            >
              <Grid container spacing={16} alignItems="flex-start">
                {objects.map(function (i, a) {
                  return (
                    <ActionCard
                      {...i}
                      sendToStack={self.handleToStack}
                      chave={i.key}
                    />
                  );
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
                <FinalStack selecteds={lastState.selected} />
            </Grid>
            </Grid>
          </Grid>
          <div style={{ position: "absolute", right: 0, bottom: 0 }}>
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.undo}>
              <Undo />
            </Fab>
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.redo}>
              <Redo />
            </Fab>
          </div>
        </Grid>
      </DragDropContext>
    );
  }
}


export default withStyles(styles)(DynamicSelector);
