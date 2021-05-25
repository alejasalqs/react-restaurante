import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";

export const AppRouter = () => {
  return (
    <>
      <Router>
        <>
          <Switch>
            <Route path="/dashboard" component={DashboardRouter} />
            <Route path="/auth" component={AuthRouter} />
          </Switch>
        </>
      </Router>
    </>
  );
};
