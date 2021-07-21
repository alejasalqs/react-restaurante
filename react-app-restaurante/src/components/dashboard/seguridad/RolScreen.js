import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingRols } from "../../../actions/rol.actions";
import { Table } from "../../../helpers/Table.helper";

export const RolScreen = () => {
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
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingRols());
  }, [dispatch]);

  const { rols } = useSelector((state) => state.rols);

  const handleOnclik = () => {};

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Roles o eventos</h1>
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
              <Table columns={columns} data={rols} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
