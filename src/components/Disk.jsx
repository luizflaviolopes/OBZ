import React from "react";


export class Disk extends React.Component {
    constructor(props) {
        super(props);

        
    }


    render() {
        return (
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="250px" height="90px" viewBox="0 55 230 90"
                onClick={this.props.onClick}>
                <g id="layer1" style={{ display: "inline" }}

                >
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
                    {this.props.pos > -1 &&(<path
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
                    />)}
                </g>
                <g>
                    <text
                        fill={this.props.color.text}
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
                        {this.props.text}
                    </text>
                </g>
            </svg >
        )
    }

}
