import React from "react";


export class FinalStack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid key={this.props.key} item>
        <Paper elevation={1}>
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
