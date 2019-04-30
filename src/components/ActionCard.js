import React from "react";
import "../css/Cards.css";
import { Grid, Paper, Typography } from "@material-ui/core";

export class ActionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }

  render() {
    return (
      <Grid key={this.props.key} item className="card-w-limit">
        <Paper elevation={1}>
          <Typography variant="h6" gutterBottom={true}>
            {this.state.UnidadeAdmin}
          </Typography>
          <Typography component="p">{this.state.Entrega}</Typography>
        </Paper>
      </Grid>
    );
  }
}
