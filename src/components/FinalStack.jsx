import React from "react";
import { SelectionDisk } from "./SelectionDisk";
import { Tooltip } from "./Tooltip";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Stack } from "./Stack";

export class FinalStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stack: this.props.selecteds, tooltipParams: null };
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidUpdate(oldProps) {
    if (this.props.selecteds !== oldProps.selecteds)
      this.setState({ stack: this.props.selecteds });
  }

  handleClick(obj, elem) {
    window.teste = elem;
    let newParams = { element: elem, ...obj };
    this.setState({ tooltipParams: newParams });
  }

  render() {
    let nStackItens = this.state.stack.length;
    let _this = this;
    let totalline;
    let tooltip;

    if (this.state.tooltipParams != null) {
      tooltip = (
        <Tooltip
          {...this.state.tooltipParams}
          onClose={() => this.setState({ tooltipParams: null })}
        />
      );
    }

    if (nStackItens > 0) {
      let soma = this.state.stack.reduce(
        (a, b) =>
          a +
          (b.PrecoTotal
            ? parseFloat(
              b.PrecoTotal.replace(/[a-zA-Z$]/g, "")
                .replace(/[.]/g, "")
                .replace(",", ".")
            )
            : 0),
        0
      );
      let h = (50 + nStackItens * 48);
      totalline = (
        <svg style={{ position: 'absolute', top: 0, right: 0 }} viewBox={"20 0 100 " + h} height={h}>
          <g>
            <line
              x1="100"
              y1="0"
              x2="100"
              y2={h}
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1="250"
              y1="130"
              x2="240"
              y2="130"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1="250"
              y1={120 - nStackItens * 50}
              x2="240"
              y2={120 - nStackItens * 50}
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <text
              fill="black"
              fillOpacity="1"
              x="270"
              y={130 - nStackItens * 25}
              textAnchor="left"
              text-decoration="none"
              rotate="0"
              kerning="auto"
              text-rendering="auto"
              fill-rule="evenodd"
              font-style="normal"
              font-variant="normal"
              font-weight="bold"
              font-size="12px"
              fontFamily="arial,helvetica,sans-serif"
            >
              {soma.toLocaleString()}
            </text>
          </g>
        </svg>
      );
    }

    return (
      <div>


        <Droppable droppableId='droppable'>
          {(provided) => (
            <Stack
              provided={provided}
              innerRef={provided.innerRef}
            >
              {this.state.stack.map(function (i, a) {
                return (

                  <Draggable draggableId={'disk' + i.key} index={a} key={'disk' + i.key}>
                    {(providedr, s) => (

                      <SelectionDisk
                        provided={providedr}
                        innerRef={providedr.innerRef}
                        {...i}
                        snap={s}
                        position={a}
                        onDetail={_this.handleClick}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {totalline}
            </Stack>
          )
          }
        </Droppable>


        {tooltip}
      </div>
    );
  }
}
