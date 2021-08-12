import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBebidaCaliente,
  startLoadingBebidaCaliente,
} from "../../../actions/bebidas-calientes.action";

import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { BebidaCalienteModal } from "../modals/BebidaCalienteModal";
import { BuffetModal } from "../modals/BuffetModal";

export const BebidasCalienteScreen = () => {
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
        Header: "Precio",
        accessor: "precio",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingBebidaCaliente());
  }, [dispatch]);

  const { bebidas_caliente } = useSelector((state) => state.bebidas_calientes);

  const handleOnclik = (bebida_caliente) => {
    //console.log(job);
    dispatch(setActiveBebidaCaliente(bebida_caliente));
    dispatch(openModal("bebidascalientes"));
  };

  const handleAdd = () => {
    dispatch(openModal("bebidascalientes"));
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
                data={bebidas_caliente}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <BebidaCalienteModal />
    </div>
  );
};
