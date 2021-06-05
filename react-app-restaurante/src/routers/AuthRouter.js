import React from "react";
import { Route, Switch } from "react-router";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={LoginScreen} />
      <Route path="/auth/register" component={RegisterScreen} />
    </Switch>
  );
};
