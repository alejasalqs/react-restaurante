import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { EmpleadosScreen } from "../components/dashboard/administracion/EmpleadosScreen";
import { EspecialesScreen } from "../components/dashboard/administracion/EspecialesScreen";
import { MesasScreen } from "../components/dashboard/administracion/MesasScreen";
import { PuestosScreen } from "../components/dashboard/administracion/PuestosScreen";
import { MarcasScreen } from "../components/dashboard/clientes/MarcasScreen";
import { ProductosScreen } from "../components/dashboard/clientes/ProductosScreen";
import { ProveedoresScreen } from "../components/dashboard/clientes/ProveedoresScreen";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { BitacoraScreen } from "../components/dashboard/reportes/BitacoraScreen";
import { ReporteClientesScreen } from "../components/dashboard/reportes/ReporteClientesScreen";
import { ReporteFacturacionScreen } from "../components/dashboard/reportes/ReporteFacturacionScreen";
import { ConsecutivosScreen } from "../components/dashboard/seguridad/ConsecutivosScreen";
import { CountryScreen } from "../components/dashboard/seguridad/CountryScreen";
import { RolScreen } from "../components/dashboard/seguridad/RolScreen";
import { UnidadMedidaScreen } from "../components/dashboard/seguridad/UnidadMedidaScreen";
import { UsuariosScreen } from "../components/dashboard/seguridad/UsuariosScreen";
//import { Footer } from "../components/ui/Footer";
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

              <Route exact path="/dashboard/marcas" component={MarcasScreen} />

              <Route
                exact
                path="/dashboard/productos"
                component={ProductosScreen}
              />

              <Route
                exact
                path="/dashboard/proveedores"
                component={ProveedoresScreen}
              />

              <Route
                exact
                path="/dashboard/reporte-clientes"
                component={ReporteClientesScreen}
              />

              <Route
                exact
                path="/dashboard/bitacora"
                component={BitacoraScreen}
              />

              <Route
                exact
                path="/dashboard/reporte-facturacion"
                component={ReporteFacturacionScreen}
              />

              <Route
                exact
                path="/dashboard/usuarios"
                component={UsuariosScreen}
              />

              <Route
                exact
                path="/dashboard/consecutivos"
                component={ConsecutivosScreen}
              />

              <Route exact path="/dashboard/paises" component={CountryScreen} />

              <Route exact path="/dashboard/roles" component={RolScreen} />

              <Route
                exact
                path="/dashboard/unidades"
                component={UnidadMedidaScreen}
              />

              <Route path="/dashboard" component={HomeScreen} />

              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
