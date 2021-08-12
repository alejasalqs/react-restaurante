import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBebidaGaseosa,
  startLoadingBebidaGaseosa,
} from "../../../actions/bebidas-gaseosa.action";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { BebidaGaseosaModal } from "../modals/BebidaGaseosaModal";

export const BebidasGaseosasScreen = () => {
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
    dispatch(startLoadingBebidaGaseosa());
  }, [dispatch]);

  const { bebidas_gaseosa } = useSelector((state) => state.bebidas_gaseosa);

  const handleOnclik = (bebida_gaseosa) => {
    //console.log(job);
    dispatch(setActiveBebidaGaseosa(bebida_gaseosa));
    dispatch(openModal("bebidasgaseosas"));
  };

  const handleAdd = () => {
    dispatch(openModal("bebidasgaseosas"));
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
                data={bebidas_gaseosa}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <BebidaGaseosaModal />
    </div>
  );
};
