import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCountry,
  startLoadingCountry,
} from "../../../actions/country.actions";
import { openModal } from "../../../actions/ui.actions";
import { Table } from "../../../helpers/Table.helper";
import { CountryModal } from "../../ui/modals/CountryModal";

export const CountryScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "pais",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingCountry());
  }, [dispatch]);

  const { countries } = useSelector((state) => state.countries);

  const handleOnclik = (country) => {
    //console.log(job);
    dispatch(setActiveCountry(country));
    dispatch(openModal("country"));
  };

  const handleAdd = () => {
    dispatch(openModal("country"));
  };

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Países</h1>
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
                data={countries}
                onClick={handleOnclik}
              />
            </div>
          </div>
        </div>
      </div>
      <CountryModal />
    </div>
  );
};
