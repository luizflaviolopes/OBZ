import React from "react";
import { SelectionDisk } from "./SelectionDisk";
import { Tooltip } from "./Tooltip";
import { Droppable } from 'react-beautiful-dnd';
import { FormHelperText } from "@material-ui/core";

export class Stack extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { provided, innerRef, children } = this.props
        return (
            <div
                {...provided.droppableProps}
                ref={innerRef}
                style={{position:'relative',marginTop:'10%'}}
                /*style={{ display: 'flex', flexDirection: 'column-reverse' }}*/
            >
                {this.props.children}
            </div>
        )
    }

}
