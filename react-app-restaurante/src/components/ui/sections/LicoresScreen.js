import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveLicores,
  startLoadingLicores,
} from "../../../actions/licores.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { BuffetModal } from "../modals/BuffetModal";

export const LicoresScreen = () => {
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
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingLicores());
  }, [dispatch]);

  const { licores } = useSelector((state) => state.licores);

  const handleOnclik = (licor) => {
    //console.log(job);
    dispatch(setActiveLicores(licor));
    dispatch(openModal("licores"));
  };

  const handleAdd = () => {
    dispatch(openModal("licores"));
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
              <Table columns={columns} data={licores} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <BuffetModal />
    </div>
  );
};
