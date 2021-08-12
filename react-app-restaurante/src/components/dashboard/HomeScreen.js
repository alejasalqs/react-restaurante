import React from "react";
import { Link, NavLink } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <>
      <div className="block animate__animated animate__fadeIn">
        <div className="column">
          <h1 className="title">Dashboard</h1>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="columns">
                  <div className="column">
                    <div className="card">
                      <div className="card-content">
                        <p className="title">
                          <i className="fas fa-city fa-5x"></i>
                        </p>
                        <p className="subtitle">
                          <NavLink to="/dashboard/admin-mesas">
                            Resturantes
                          </NavLink>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
