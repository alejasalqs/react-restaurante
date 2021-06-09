import React from "react";
import { Route, Switch } from "react-router";
import { EmpleadosScreen } from "../components/dashboard/administracion/EmpleadosScreen";
import { EspecialesScreen } from "../components/dashboard/administracion/EspecialesScreen";
import { MesasScreen } from "../components/dashboard/administracion/MesasScreen";
import { PuestosScreen } from "../components/dashboard/administracion/PuestosScreen";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRouter = () => {
  return (
    <div className="columns app">
      <div className="column">
        <Navbar />
        <div className="columns">
          <Sidebar />
          <div className="column">
            <Switch>
              <Route
                exact
                path="/dashboard/especiales"
                component={EspecialesScreen}
              />
              <Route exact path="/dashboard/mesas" component={MesasScreen} />
              <Route
                exact
                path="/dashboard/empleados"
                component={EmpleadosScreen}
              />
              <Route
                exact
                path="/dashboard/puestos"
                component={PuestosScreen}
              />
              <Route path="/dashboard" component={HomeScreen} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
