import React from "react";
import { Route, Switch } from "react-router";
import { HomeScreen } from "../components/dashboard/HomeScreen";

export const DashboardRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={HomeScreen} />
      </Switch>
    </div>
  );
};
