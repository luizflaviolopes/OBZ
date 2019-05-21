import React from "react";

export class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div
        {...provided.droppableProps}
        ref={innerRef}
        style={{ position: "relative", marginTop: "10%" }}
        /*style={{ display: 'flex', flexDirection: 'column-reverse' }}*/
      >
        {this.props.children}
      </div>
    );
  }
}
