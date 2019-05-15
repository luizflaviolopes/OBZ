import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { ActionCard } from "./ActionCard";
import { Grid, Fab } from "@material-ui/core";
import { SelectionDisk } from "./SelectionDisk";
import "../css/svg.css";
import { FinalStack } from "./FinalStack";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";
import ClearAll from "@material-ui/icons/ClearAll";
import api from "../Services/Api";
import { Scrollbars } from "react-custom-scrollbars";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class DynamicSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialData: null,
      DataHistory: [{ toSelect: [], selected: [] }],
      Backed: [],
      ready: false
    };
    this.getLastData = this.getLastData.bind(this);
    this.handleToStack = this.handleToStack.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }

  componentWillMount() {
    api.get("/api/stacks?unidade=" + this.props.match.params.un).then(x => {
      if (!x.error) {
        this.setState({
          initialData: x.data.init,
          DataHistory: x.data.history || [
            { toSelect: x.data.init, selected: [] }
          ],
          ready: true
        });
      }
    });
  }

  undo() {
    if (this.state.DataHistory.length > 1) {
      let history = [...this.state.DataHistory];
      let toUndo = history.pop();
      this.setState({
        DataHistory: history,
        Backed: this.state.Backed.concat(toUndo)
      });
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
    let current = JSON.parse(JSON.stringify(c));

    let toStack = current.toSelect[item].shift();
    current.selected = [...current.selected, toStack];

    if (current.toSelect[item].length === 0) delete current.toSelect[item];

    this.setState({
      DataHistory: [...this.state.DataHistory, current],
      Backed: []
    });
  }

  render() {
    const { classes } = this.props;
    let lastState = this.getLastData();
    let self = this;
    let objects = [];

    Object.keys(lastState.toSelect).forEach(function(i, a) {
      objects.push(lastState.toSelect[i][0]);
    });

    return (
      <Scrollbars style={{ width: "100vw", height: "100vh" }}>
        <Grid container spacing={0} direction={"row"} className="fullHeigth">
          <div style={{ position: "fixed", left: 0, top: 0, zIndex: 99999 }}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={() => this.props.history.push("/Unidades")}
            >
              <ClearAll />
            </Fab>
          </div>
          <Grid item xs={8}>
            <Grid
              container
              spacing={0}
              className="item-selector"
              justify="center"
              direction="row"
            >
              <Grid container spacing={16} alignItems="flex-start">
                {objects.map(function(i, a) {
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
          <div style={{ position: "fixed", right: 0, bottom: 0 }}>
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.undo}
            >
              <Undo />
            </Fab>
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.redo}
            >
              <Redo />
            </Fab>
          </div>
        </Grid>
      </Scrollbars>
    );
  }
}

export default withStyles(styles)(DynamicSelector);
