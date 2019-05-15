import React from "react";

export class SelectionDisk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      textReduced: this.props.detalhamento.substring(0, 30) + "..."
    };
  }

  render() {
    return (
      <g
        onClick={evt => this.props.onDetail(this.state, evt.target)}
        style={{
          transform: "translate(0px,-" + this.props.position * 50 + "px)"
        }}
      >
        <g id="layer1" style={{ display: "inline" }}>
          <path
            style={{
              fill: this.props.color.fill,
              stroke: this.props.color.stroke,
              strokeWidth: "2",
              strokeLinecap: "butt",
              strokelinejoin: "miter",
              strokeOpacity: "1",
              fillOpacity: "1",
              strokeMiterlimit: "4",
              strokeDasharray: "none"
            }}
            d="m 3.670893,77.942596 c -0.4174893,17.551196 224.609277,17.551196 224.609277,0 V 122.4405 c 0.49144,23.66534 -225.5579095,23.66534 -224.609277,0 z"
            id="path4594"
          />
        </g>
        <g id="layer2" style={{ display: "inline" }}>
          >
          <path
            id="path3753-1-1-0"
            d="M 228.54805,78.249717 A 112.53122,16.429789 0 0 1 116.53376,94.754506 112.53122,16.429789 0 0 1 3.4879794,78.400318 112.53122,16.429789 0 0 1 115.50051,61.895275 112.53122,16.429789 0 0 1 228.54804,78.249206"
            style={{
              fill: this.props.color.fill,
              fillOpacity: "1",
              stroke: this.props.color.stroke,
              strokeWidth: "2",
              strokeMiterlimit: "4",
              strokeDasharray: "none",
              strokeOpacity: "1"
            }}
          />
        </g>
        <g>
          <text
            fill="black"
            fillOpacity="1"
            stroke="none"
            stroke-opacity="0"
            strokeWidth="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="4"
            x="115"
            y="120"
            text-anchor="middle"
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
            style={{ textOverflow: "ellipsis" }}
          >
            {this.state.textReduced}
          </text>
        </g>
      </g>

      /*

      <g class="dark-shape shapebase" style={{ transform: "translate(0px,-" + this.props.position * 40 + "px)" }}>
        <g>
          <path fill={this.props.color.fill} fillOpacity="1" stroke={this.props.color.stroke} stroke-opacity="1" strokeWidth="3.0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" stroke-dasharray="none" dojoGfxStrokeStyle="solid" d="m0.5561302292627056,10.85075343655969l0,34.1925309318896c0,0 41.8308358163997,10.773282460928733 103.17740212965785,9.836137878339406c61.34656233034464,-0.9370107812497227 93.41463192325186,-8.430688607134625 93.41463192325186,-8.430688607134625l0,-34.1925309318896" fill-rule="evenodd">
          </path>
          <path fill={this.props.color.fill} fillOpacity="1" stroke={this.props.color.stroke} stroke-opacity="1" strokeWidth="3.0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" stroke-dasharray="none" dojoGfxStrokeStyle="solid" d="m103.72792441671082,0.546310869604829c119.47483894468803,3.5417214593288815 133.84998230205395,18.736067783466716 0,19.672677160697624c-133.8485803165015,0.9375459866081403 -142.2116631115661,-23.887553159576324 0,-19.672677160697624z" fill-rule="evenodd">
          </path>
        </g>
        <rect fill="rgb(0, 0, 0)" fillOpacity="0" stroke="rgb(51, 51, 51)" stroke-opacity="0" strokeWidth="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" width="199" height="55" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none" dojoGfxStrokeStyle="solid">
        </rect>
          <g>
            <text fill="black" fillOpacity="1" stroke="none" stroke-opacity="0" strokeWidth="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="99" y="40" text-anchor="middle" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="bold" font-size="12px" fontFamily="arial,helvetica,sans-serif" style={{textOverflow:"ellipsis"}}>
            {this.state.textReduced}
            </text>
          </g>
      </g>*/
    );
  }
}
