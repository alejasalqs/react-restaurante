import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  const { checking, logged } = useSelector((state) => state.auth);

  return logged === false ? (
    <Switch>
      <div className="columns is-centered is-vcentered">
        <Route exact path="/auth/login" component={LoginScreen} />
        <Route exact path="/auth/register" component={RegisterScreen} />
        {<Redirect to="/auth/login" />}
      </div>
    </Switch>
  ) : (
    <Redirect to="/dashboard" />
  );
};
