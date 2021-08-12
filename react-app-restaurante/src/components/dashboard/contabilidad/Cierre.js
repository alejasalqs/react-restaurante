import React from "react";

export const Cierre = () => {
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Cierre Caja</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <form>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Restaurante</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="restaurante"
                          placeholder="Restaurante"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Monto</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          name="monto"
                          placeholder="Monto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <button className="button is-danger">Cerrar Caja</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
