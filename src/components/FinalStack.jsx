import React from "react";
import { SelectionDisk } from "./SelectionDisk";
import { Tooltip } from "./Tooltip";

export class FinalStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stack: this.props.selecteds, tooltipParams: null };
    this.handleClick = this.handleClick.bind(this);
  }


componentDidUpdate(oldProps){
  if(this.props.selecteds !== oldProps.selecteds)
  this.setState({stack: this.props.selecteds});
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

      totalline = (
        <g>
          <line
            x1="250"
            y1="130"
            x2="250"
            y2={120 - nStackItens * 50}
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
      );
    }

    return (
      <div>
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 500 800"
          preserveAspectRatio="xMinYMin meet"
        >
          <g
            style={{
              transform: "translate(100px," + (300 + nStackItens * 20) + "px)"
            }}
          >
            <g>
              {this.state.stack.map(function(i, a) {
                return (
                  <SelectionDisk
                    {...i}
                    key={a}
                    position={a}
                    onDetail={_this.handleClick}
                  />
                );
              })}
            </g>
            {totalline}
          </g>
        </svg>
        {tooltip}
      </div>
    );
  }
}
