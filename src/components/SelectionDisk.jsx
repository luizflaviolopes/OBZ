import React from "react";
import { Disk } from "./Disk";

export class SelectionDisk extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...this.props,
      textReduced: this.props.detalhamento.substring(0, 30) + "..."
    };
  }

  render() {
    const { provided, innerRef, snap } = this.props;
    const style = {
      display: "block",
      textAlign: "center",
      width: "100%",
      position: "relative",
      marginTop: snap.isDragging ? 0 : "-10%",
      zIndex: 1000 - this.props.position,
      ...provided.draggableProps.style
    };
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        style={style}
      >
        <Disk
          color={this.props.color}
          text={this.state.textReduced}
          onClick={evt => this.props.onDetail(this.state, evt.target)}
          pos={this.props.position}
        />
      </div>
    );
  }
}
