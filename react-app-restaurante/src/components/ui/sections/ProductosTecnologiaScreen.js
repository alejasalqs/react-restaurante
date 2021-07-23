import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTecnologia,
  startLoadingTecnologia,
} from "../../../actions/tecnologia.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { TecnologiaModal } from "../modals/TecnologiaModal";

export const ProductosTecnologiaScreen = () => {
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
    dispatch(startLoadingTecnologia());
  }, [dispatch]);

  const { tecnologia } = useSelector((state) => state.tecnologia);

  const handleOnclik = (tecnologia) => {
    //console.log(job);
    dispatch(setActiveTecnologia(tecnologia));
    dispatch(openModal("tecnologia"));
  };

  const handleAdd = () => {
    dispatch(openModal("tecnologia"));
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
                data={tecnologia}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <TecnologiaModal />
    </div>
  );
};
