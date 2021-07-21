import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingUnidadesMedida } from "../../../actions/unidad-medida.action";
import { Table } from "../../../helpers/Table.helper";

export const UnidadMedidaScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Primer apellido",
        accessor: "apellido1",
      },
      {
        Header: "Segundo apellido",
        accessor: "apellido2",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
      },
      {
        Header: "Celular",
        accessor: "celular",
      },
      {
        Header: "Login",
        accessor: "login",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingUnidadesMedida());
  }, [dispatch]);

  const { unidades_medida } = useSelector((state) => state.unidadMedida);

  const handleOnclik = () => {};

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Usuarios</h1>
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
              <Table
                columns={columns}
                data={unidades_medida}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
