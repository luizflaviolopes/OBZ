import React from "react";
import { SelectionDisk } from "./SelectionDisk";
import { Tooltip } from "./Tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
    let newParams = { element: elem, ...obj };
    console.log(newParams);
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
      let soma = this.state.stack.reduce((a, b) => a + b.valorTotal, 0);
      let h = 20 +nStackItens * 48;

      totalline = (
        <svg

          viewBox={"0 0 100 " + h}
          height={h}
        >
          <g>
            <line
              x1="10"
              y1="10"
              x2="10"
              y2={h}
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1="0"
              y1="10"
              x2="10"
              y2="10"
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <line
              x1='0'
              y1={h}
              x2="10"
              y2={h}
              style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
            />
            <text
              fill="black"
              fillOpacity="1"
              x="20"
              y={h/2}
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
      <div style={{ position: "inherit", width: "100%", height: "100vh" }}>
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          <div style={{display:'flex', justifyContent:'center', position:'absolute', margin:'auto', paddingBottom:'20px', width:'100%', top: ((40 - nStackItens*2) > 5 ?(40 - nStackItens*2): 5)+'%' }}>
            <Droppable droppableId={"droppable"}>
              {provided => (
                <Stack provided={provided} innerRef={provided.innerRef}>
                  {this.state.stack.map(function(i, a) {
                    return (
                      <Draggable
                        draggableId={"disk" + i.key}
                        index={a}
                        key={"disk" + i.key}
                      >
                        {(provided, s) => (
                          <SelectionDisk
                            provided={provided}
                            innerRef={provided.innerRef}
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
                </Stack>
              )}
            </Droppable>
            {totalline}
          </div>
        </Scrollbars>
        {tooltip}
      </div>
    );
  }
}
