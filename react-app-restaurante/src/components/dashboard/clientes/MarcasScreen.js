import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingBrands } from "../../../actions/marcas.actions";
import { Table } from "../../../helpers/Table.helper";

export const MarcasScreen = () => {
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
        Header: "Descripcion",
        accessor: "descripcion",
      },
      {
        Header: "Nacionalidad",
        accessor: "nacionalidad",
      },
      {
        Header: "Empresa",
        accessor: "empresa",
      },
      {
        Header: "Telefono Empresa",
        accessor: "telefono_empresa",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingBrands());
  }, [dispatch]);

  const { brands } = useSelector((state) => state.brands);

  const handleOnclik = () => {};

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Marcas</h1>
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
              <Table columns={columns} data={brands} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
