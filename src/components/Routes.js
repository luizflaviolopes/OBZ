import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated, logout } from "../Services/Auth";
import Login from "./Login";
import Unidades from "./Unidades";
import DynamicSelector from "./DynamicSelector";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/Stack/:un" component={DynamicSelector} />
      <PrivateRoute path="/Unidades" component={Unidades} />
      <Route path="*" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
