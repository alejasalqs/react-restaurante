import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveEspecialidad,
  startLoadingEspecialidad,
} from "../../../actions/especialidades.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { EspecialidadesModal } from "../modals/EspecialidadesModal";

export const EspecialidadesScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre Platillo",
        accessor: "nombre",
      },
      {
        Header: "Ingredientes",
        accessor: "ingredientes",
      },
      {
        Header: "Precio",
        accessor: "precio",
      },
      {
        Header: "Detalle",
        accessor: "detalle",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingEspecialidad());
  }, [dispatch]);

  const { especialidades } = useSelector((state) => state.especialidades);

  const handleOnclik = (especialidad) => {
    //console.log(job);
    dispatch(setActiveEspecialidad(especialidad));
    dispatch(openModal("especialidades"));
  };

  const handleAdd = () => {
    dispatch(openModal("especialidades"));
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
                data={especialidades}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <EspecialidadesModal />
    </div>
  );
};
