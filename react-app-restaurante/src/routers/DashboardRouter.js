import React from "react";
import { Route, Switch } from "react-router";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRouter = () => {
  return (
    <div className="hold-transition sidebar-mini" style={{ height: "auto" }}>
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" component={HomeScreen} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
};
