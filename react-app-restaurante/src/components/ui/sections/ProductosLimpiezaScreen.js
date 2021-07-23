import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveLimpieza,
  startLoadingLimpieza,
} from "../../../actions/limpieza.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { LimpiezaModal } from "../modals/LimpiezaModal";

export const ProductosLimpiezaScreen = () => {
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
    dispatch(startLoadingLimpieza());
  }, [dispatch]);

  const { limpieza } = useSelector((state) => state.limpieza);

  const handleOnclik = (limpieza) => {
    //console.log(job);
    dispatch(setActiveLimpieza(limpieza));
    dispatch(openModal("limpieza"));
  };

  const handleAdd = () => {
    dispatch(openModal("limpieza"));
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
              <Table columns={columns} data={limpieza} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <LimpiezaModal />
    </div>
  );
};
