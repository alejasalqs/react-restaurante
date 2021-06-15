import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveEmployee } from "../../../actions/employees.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { EmpleadosModal } from "../../ui/modals/EmpleadosModal";

export const EmpleadosScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Cédula",
        accessor: "cedula",
      },
      {
        Header: "",
        accessor: "nombre",
        columns: [
          {
            Header: "Nombre completo",
            accessor: "nombre",
          },
          {
            accessor: "apellido1",
          },
          {
            accessor: "apellido2",
          },
        ],
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
      },
      {
        Header: "Puesto",
        accessor: "puesto",
      },
      {
        Header: "Restaurant",
        accessor: "restaurant",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employees);

  const handleOnclik = (employee) => {
    console.log(employee);
    dispatch(setActiveEmployee(employee));
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
