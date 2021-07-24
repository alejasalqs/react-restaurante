import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveComestible,
  startLoadingComestibles,
} from "../../../actions/comestibles.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { ComestiblesModal } from "../modals/ComestiblesModal";

export const ProductosComestiblesScreen = () => {
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
      {
        Header: "Descripcion",
        accessor: "descripcion",
        show: false,
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingComestibles());
  }, [dispatch]);

  const { comestibles } = useSelector((state) => state.comestibles);

  const handleOnclik = (comestible) => {
    //console.log(job);
    dispatch(setActiveComestible(comestible));
    dispatch(openModal("comestibles"));
  };

  const handleAdd = () => {
    dispatch(openModal("comestibles"));
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
                data={comestibles}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <ComestiblesModal />
    </div>
  );
};
