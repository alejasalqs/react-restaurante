import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../actions/ui.actions";
import { EmpleadosModal } from "../../ui/modals/EmpleadosModal";

export const EmpleadosScreen = () => {
  const dispatch = useDispatch();

  const handleOnclik = () => {
    console.log("holaaa");
    dispatch(openModal());
  };

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Empleados</h1>
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
                    <th>Cédula</th>
                    <th>Nombre Completo</th>
                    <th>Telefono</th>
                    <th>Puesto</th>
                    <th>Restaurante</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={handleOnclik}>
                    <td>1</td>
                    <td>117270430</td>
                    <td>Alejandro Salguero Quirós</td>
                    <td>84469756</td>
                    <td>Chef</td>
                    <td>Patito</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EmpleadosModal />
    </div>
  );
};
