import React from "react";
import { data } from "../Json";
import { ActionCard } from "./ActionCard";
import { Grid } from "@material-ui/core";

var d = data;
window.dados = d;

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export class DynamicSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: groupBy(
        d.sort(function(a, b) {
          return a - b;
        }),
        "Entrega"
      ),
    };
  }

  render() {
    let data = this.state.actions;
    let objects = [];

    Object.keys(this.state.actions).forEach(function(i, a) {
      objects.push(data[i][0]);
    });

    console.log(objects);

    return (
      <Grid container spacing={0} direction={"row"} className="fullHeigth">
        <Grid item xs={8}>
          <Grid
            container
            spacing={0}
            xs={12}
            className="item-selector"
            justify="center"
            alignItems="top"
            direction="row"
          >
            <Grid container xs={12} spacing={16}>
              {objects.map(function(i, a) {
                return <ActionCard {...i} />;
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={16} xs={12}>
            <Grid item xs={12}>
              <svg height="300px" width="300px">
                <g>
                  <path
                    fill="rgb(204, 204, 255)"
                    fill-opacity="0"
                    stroke="rgb(29, 0, 255)"
                    stroke-opacity="1"
                    stroke-width="3.0"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="4"
                    path=""
                    stroke-dasharray="none"
                    dojoGfxStrokeStyle="solid"
                    d="m0.5561302292627056,10.85075343655969l0,34.1925309318896c0,0 41.8308358163997,10.773282460928733 103.17740212965785,9.836137878339406c61.34656233034464,-0.9370107812497227 93.41463192325186,-8.430688607134625 93.41463192325186,-8.430688607134625l0,-34.1925309318896"
                    fill-rule="evenodd"
                  />
                  <path
                    fill="rgb(204, 204, 255)"
                    fill-opacity="0"
                    stroke="rgb(29, 0, 255)"
                    stroke-opacity="1"
                    stroke-width="3.0"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="4"
                    path=""
                    stroke-dasharray="none"
                    dojoGfxStrokeStyle="solid"
                    d="m103.72792441671082,0.546310869604829c119.47483894468803,3.5417214593288815 133.84998230205395,18.736067783466716 0,19.672677160697624c-133.8485803165015,0.9375459866081403 -142.2116631115661,-23.887553159576324 0,-19.672677160697624z"
                    fill-rule="evenodd"
                  />
                </g>
              </svg>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
