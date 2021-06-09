import React from "react";
import { Route, Switch } from "react-router";
import { EspecialesScreen } from "../components/dashboard/EspecialesScreen";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRouter = () => {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <Navbar />
              <Switch>
                <Route
                  exact
                  path="/dashboard/especiales"
                  component={EspecialesScreen}
                />
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
