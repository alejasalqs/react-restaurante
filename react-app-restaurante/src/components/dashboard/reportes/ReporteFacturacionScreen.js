import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingClientes } from "../../../actions/clients.actions";
import { Table } from "../../../helpers/Table.helper";

export const ReporteFacturacionScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "consecutivo",
      },
      {
        Header: "Nombre",
        accessor: "nombre_completo",
      },
      {
        Header: "Monto",
        accessor: "monto_pagado",
      },
      {
        Header: "Detalle",
        accessor: "detalle",
      },
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "Reservacion",
        accessor: "reservacion",
      },
      {
        Header: "Barra",
        accessor: "barra",
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
    dispatch(startLoadingClientes());
  }, [dispatch]);

  const { clients } = useSelector((state) => state.clientes);

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Reporte Facturación</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content"></div>
            <Table columns={columns} data={clients} />
          </div>
        </div>
      </div>
    </div>
  );
};
