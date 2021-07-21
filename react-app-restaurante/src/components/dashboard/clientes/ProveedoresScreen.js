import React from "react";

export const ProveedoresScreen = () => {
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Proveedores</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <button
                className="button is-success is-rounded mb-3"
                type="button"
                onClick={null}
              >
                <i className="fas fa-user-plus mr-2"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
