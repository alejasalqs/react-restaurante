import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingDesechables } from "../../../actions/desechables.actions";
import { Table } from "../../../helpers/Table.helper";

export const ProductosDesechablesScreen = () => {
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
        Header: "Cantidad",
        accessor: "cantidad",
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
    dispatch(startLoadingDesechables());
  }, [dispatch]);

  const { desechables } = useSelector((state) => state.desechables);

  const handleOnclik = () => {};

  return (
    <div className="block animate__animated animate__fadeIn">
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
                data={desechables}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
