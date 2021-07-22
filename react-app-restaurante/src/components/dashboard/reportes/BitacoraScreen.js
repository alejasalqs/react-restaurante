import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingBitacora } from "../../../actions/bitacora.actions";
import { Table } from "../../../helpers/Table.helper";

export const BitacoraScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Usuario",
        accessor: "usuario.login",
      },
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "Detalle",
        accessor: "descripcion",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingBitacora());
  }, [dispatch]);

  const { bitacora } = useSelector((state) => state.bitacora);

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Bitácora</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <Table columns={columns} data={bitacora} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
