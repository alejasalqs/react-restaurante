import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { EmpleadosScreen } from "../components/dashboard/administracion/EmpleadosScreen";
import { EspecialesScreen } from "../components/dashboard/administracion/EspecialesScreen";
import { MesasScreen } from "../components/dashboard/administracion/MesasScreen";
import { PuestosScreen } from "../components/dashboard/administracion/PuestosScreen";
import { MarcasScreen } from "../components/dashboard/clientes/MarcasScreen";
import { ProductosScreen } from "../components/dashboard/clientes/ProductosScreen";
import { ProveedoresScreen } from "../components/dashboard/clientes/ProveedoresScreen";
import { Apertura } from "../components/dashboard/contabilidad/Apertura";
import { Cierre } from "../components/dashboard/contabilidad/Cierre";
import { HomeScreen } from "../components/dashboard/HomeScreen";
import { BitacoraScreen } from "../components/dashboard/reportes/BitacoraScreen";
import { ReporteClientesScreen } from "../components/dashboard/reportes/ReporteClientesScreen";
import { ReporteFacturacionScreen } from "../components/dashboard/reportes/ReporteFacturacionScreen";
import { CajasScreen } from "../components/dashboard/seguridad/CajasScreen";
import { ConsecutivosScreen } from "../components/dashboard/seguridad/ConsecutivosScreen";
import { CountryScreen } from "../components/dashboard/seguridad/CountryScreen";
import { RolScreen } from "../components/dashboard/seguridad/RolScreen";
import { UnidadMedidaScreen } from "../components/dashboard/seguridad/UnidadMedidaScreen";
import { UsuariosScreen } from "../components/dashboard/seguridad/UsuariosScreen";
//import { Footer } from "../components/ui/Footer";
import { Navbar } from "../components/ui/Navbar";
import { AdministracionMesasScreen } from "../components/ui/sections/AdministracionMesasScreen";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRouter = () => {
  const { checking, logged } = useSelector((state) => state.auth);

  return logged === true ? (
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

              <Route exact path="/dashboard/cajas" component={CajasScreen} />

              <Route
                exact
                path="/dashboard/apertura-caja"
                component={Apertura}
              />

              <Route exact path="/dashboard/cierre-caja" component={Cierre} />

              <Route
                path="/dashboard/admin-mesas"
                component={AdministracionMesasScreen}
              />

              <Route path="/dashboard" component={HomeScreen} />

              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/auth/login" />
  );
};
