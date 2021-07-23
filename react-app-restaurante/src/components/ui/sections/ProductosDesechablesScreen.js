import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDesechable,
  startLoadingDesechables,
} from "../../../actions/desechables.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { DesechablesModal } from "../modals/DesechablesModal";

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

  const handleOnclik = (desechable) => {
    //console.log(job);
    dispatch(setActiveDesechable(desechable));
    dispatch(openModal("desechables"));
  };

  const handleAdd = () => {
    dispatch(openModal("desechables"));
  };
  return (
    <div className="block animate__animated animate__fadeIn">
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
                data={desechables}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <DesechablesModal />
    </div>
  );
};
