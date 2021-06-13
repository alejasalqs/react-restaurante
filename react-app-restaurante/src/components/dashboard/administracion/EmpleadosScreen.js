import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../actions/ui.actions";
import { EmpleadosModal } from "../../ui/modals/EmpleadosModal";

export const EmpleadosScreen = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employees);

  const handleOnclik = (e) => {
    //console.log(e);
    dispatch(openModal());
  };

  const handleAdd = () => {
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
              <button
                className="button is-success is-rounded mb-3"
                type="button"
                onClick={handleAdd}
              >
                <i class="fas fa-user-plus mr-2"></i>
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
                  {employees.map((employee) => (
                    <tr
                      onClick={handleOnclik}
                      id={employee.codigo}
                      key={employee.codigo}
                    >
                      <td>{employee.codigo}</td>
                      <td>{employee.cedula}</td>
                      <td>
                        {employee.nombre} {employee.apellido1}{" "}
                        {employee.apellido2}
                      </td>
                      <td>{employee.telefono}</td>
                      <td>{employee.puesto}</td>
                      <td>{employee.restaurant}</td>
                    </tr>
                  ))}
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
