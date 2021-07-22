import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveEmployee,
  startLoadingEmployees,
} from "../../../actions/employees.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { EmpleadosModal } from "../../ui/modals/EmpleadosModal";

export const EmpleadosScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
        //show: false,
      },
      {
        Header: "Cédula",
        accessor: "cedula",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Primer Apellido",
        accessor: "apellido1",
      },
      {
        Header: "Segundo Apellido",
        accessor: "apellido2",
      },
      {
        Header: "Teléfono 1",
        accessor: "telefono1",
      },
      {
        Header: "Teléfono 2",
        accessor: "telefono2",
      },
      {
        Header: "Puesto",
        accessor: "puesto.nombre",
      },
      {
        Header: "Restaurante",
        accessor: "restaurante.nombre",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingEmployees());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.employees);

  const handleOnclik = (employee) => {
    console.log(employee);
    dispatch(setActiveEmployee(employee));
    dispatch(openModal("employees"));
  };

  const handleAdd = () => {
    dispatch(openModal("employees"));
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
                <i className="fas fa-user-plus mr-2"></i>
                Agregar
              </button>
              <Table
                columns={columns}
                data={employees}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <EmpleadosModal />
    </div>
  );
};
