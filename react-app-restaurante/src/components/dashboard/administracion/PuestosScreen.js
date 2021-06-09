import React from "react";

export const PuestosScreen = () => {
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Puestos</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <button className="button is-success is-rounded mb-3">
                Agregar
              </button>
              <table className="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Interno al Restaurante</th>
                    <th>Externo al Restaurante</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Chef</td>
                    <td>Cocina</td>
                    <td>Si</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
