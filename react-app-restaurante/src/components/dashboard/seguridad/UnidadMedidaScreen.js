import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../actions/ui.actions";
import {
  setActiveUnidadMedida,
  startLoadingUnidadesMedida,
} from "../../../actions/unidad-medida.action";
import { Table } from "../../../helpers/Table.helper";
import { UnidadMedidaModal } from "../../ui/modals/UnidadMedidaModal";

export const UnidadMedidaScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Unidad Medida",
        accessor: "unidad",
      },
      {
        Header: "Escala",
        accessor: "escala",
      },
      {
        Header: "Detalle",
        accessor: "detalle",
      },
      {
        Header: "Simbología",
        accessor: "simbologia",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingUnidadesMedida());
  }, [dispatch]);

  const { unidades_medida } = useSelector((state) => state.unidadMedida);

  const handleOnclik = (unidad_medida) => {
    //console.log(job);
    dispatch(setActiveUnidadMedida(unidad_medida));
    dispatch(openModal("unidad_medida"));
  };

  const handleAdd = () => {
    dispatch(openModal("unidad_medida"));
  };

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Unidades de Medida</h1>
      </div>
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
                data={unidades_medida}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <UnidadMedidaModal />
    </div>
  );
};
