import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="column is-one-fifth pl-3">
      <aside className="menu is-primary">
        <p className="menu-label">Administración</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard/mesas">
              <i className="fas fa-chess-board"></i> Mesas
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/empleados">
              <i className="fas fa-users"></i> Empleados
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/puestos">
              <i className="fas fa-briefcase"></i> Puestos
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/especiales">
              <i className="fas fa-utensils"></i> Especiales
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Clientes</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard/marcas">
              <i className="far fa-copyright"></i> Marcas
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/productos">
              <i className="fab fa-product-hunt"></i> Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/proveedores">
              <i className="fas fa-truck"></i> Proveedores
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Reportes</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard/bitacora">
              <i className="far fa-clipboard"></i> Bitácora
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reporte-clientes">
              <i className="fas fa-chart-pie"></i> Reporte Clientes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reporte-facturacion">
              <i className="fas fa-chart-bar"></i> Reporte Facturación
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Contabilidad</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard/especiales">
              <i className="fas fa-box-open"></i> Apertura de caja
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/especiales">
              <i className="fas fa-box"></i> Ciere de caja
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Seguridad</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard/usuarios">
              <i className="fas fa-users"></i> Usuarios
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/consecutivos">
              <i className="fas fa-list-ol"></i> Consecutivos
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paises">
              <i className="fas fa-flag"></i> Países
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cajas">
              <i className="fas fa-boxes"></i> Cajas
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/roles">
              <i className="fas fa-calendar-week"></i> Roles o eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/unidades">
              <i className="fas fa-balance-scale"></i> Unidades de Medida
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/especiales">
              <i className="fas fa-power-off"></i> Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};
