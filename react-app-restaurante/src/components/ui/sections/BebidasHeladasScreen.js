import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBebidaHelada,
  startLoadingBebidaHelada,
} from "../../../actions/bebidas-heladas.action";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { BuffetModal } from "../modals/BuffetModal";

export const BebidasHeladasScreen = () => {
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
    dispatch(startLoadingBebidaHelada());
  }, [dispatch]);

  const { bebidas_helada } = useSelector((state) => state.bebidas_heladas);

  const handleOnclik = (bebida_helada) => {
    //console.log(job);
    dispatch(setActiveBebidaHelada(bebida_helada));
    dispatch(openModal("bebidasheladas"));
  };

  const handleAdd = () => {
    dispatch(openModal("bebidasheladas"));
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
                data={bebidas_helada}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <BuffetModal />
    </div>
  );
};
