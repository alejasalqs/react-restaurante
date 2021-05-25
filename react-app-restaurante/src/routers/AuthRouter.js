import React from "react";
import { Route, Switch } from "react-router";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="login-page" style={{ minHeight: "466px" }}>
      <div className="login-box">
        <Switch>
          <Route path="/auth/login" component={LoginScreen} />
          <Route path="/auth/register" component={RegisterScreen} />
        </Switch>
      </div>
    </div>
  );
};
