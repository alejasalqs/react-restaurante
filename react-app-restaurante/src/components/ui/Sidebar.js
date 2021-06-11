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
        <p className="menu-label">Transactions</p>
        <ul className="menu-list">
          <li>
            <a>Payments</a>
          </li>
          <li>
            <a>Transfers</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>

          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
          <li>
            <a>Balance</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};
