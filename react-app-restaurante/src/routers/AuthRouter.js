import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  console.log("HOLLLA");
  return (
    <Switch>
      <div className="columns is-centered is-vcentered">
        <Route path="/auth/login" component={LoginScreen} />
        <Route path="/auth/register" component={RegisterScreen} />
        <Redirect to="/auth/login" />
      </div>
    </Switch>
  );
};
