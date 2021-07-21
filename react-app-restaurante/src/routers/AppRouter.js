import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { Loading } from "../components/ui/Loading";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  //const dispatch = useDispatch();

  const { checking, logged } = useSelector((state) => state.auth);

  if (checking) {
    //return <Loading />;
  }

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
