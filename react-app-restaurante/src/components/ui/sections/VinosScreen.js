import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../actions/ui.actions";
import {
  setActiveVinos,
  startLoadingVinos,
} from "../../../actions/vinos.actions";
import { Table } from "../../../helpers/Table.helper";
import { BuffetModal } from "../modals/BuffetModal";
import { VinosModal } from "../modals/VinosModal";

export const VinosScreen = () => {
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
        Header: "Precio",
        accessor: "precio_unitario",
      },
      {
        Header: "Nacionalidad",
        accessor: "nacionalidad.pais",
      },
      {
        Header: "Año",
        accessor: "anio_cosecha",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingVinos());
  }, [dispatch]);

  const { vinos } = useSelector((state) => state.vinos);

  const handleOnclik = (vino) => {
    //console.log(job);
    dispatch(setActiveVinos(vino));
    dispatch(openModal("vinos"));
  };

  const handleAdd = () => {
    dispatch(openModal("vinos"));
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
              <Table columns={columns} data={vinos} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <VinosModal />
    </div>
  );
};
