import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveEquipos,
  startLoadingEquipos,
} from "../../../actions/equipos.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { EquiposModal } from "../modals/EquiposModal";

export const ProductosEquiposScreen = () => {
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
    dispatch(startLoadingEquipos());
  }, [dispatch]);

  const { equipos } = useSelector((state) => state.equipos);

  const handleOnclik = (equipo) => {
    //console.log(job);
    dispatch(setActiveEquipos(equipo));
    dispatch(openModal("equipos"));
  };

  const handleAdd = () => {
    dispatch(openModal("equipos"));
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
              <Table columns={columns} data={equipos} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <EquiposModal />
    </div>
  );
};
