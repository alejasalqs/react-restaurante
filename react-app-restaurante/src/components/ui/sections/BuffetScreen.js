import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBuffet,
  startLoadingBuffet,
} from "../../../actions/buffet.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { BuffetModal } from "../modals/BuffetModal";

export const BuffetScreen = () => {
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
      {
        Header: "Tipo",
        accessor: "tipo_comida",
      },
      {
        Header: "Unidad Medida",
        accessor: "unidad_medida",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingBuffet());
  }, [dispatch]);

  const { buffets } = useSelector((state) => state.buffets);

  const handleOnclik = (buffet) => {
    //console.log(job);
    dispatch(setActiveBuffet(buffet));
    dispatch(openModal("buffets"));
  };

  const handleAdd = () => {
    dispatch(openModal("buffets"));
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
              <Table columns={columns} data={buffets} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <BuffetModal />
    </div>
  );
};
