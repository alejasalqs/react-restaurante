import React from "react";
import { useDispatch } from "react-redux";
import { setActiveTable } from "../../actions/tables.actions";
import { openModal } from "../../actions/ui.actions";

export const MesasCard = ({ cantidad_sillas, nombre, codigo, numero, _id }) => {
  const dispatch = useDispatch();

  const openOrdenesModal = () => {
    dispatch(openModal("ordenes"));
    dispatch(setActiveTable({ cantidad_sillas, nombre, codigo, numero, _id }));
  };
  return (
    <div
      className="notification is-success is-light"
      style={{ cursor: "pointer" }}
      onClick={openOrdenesModal}
    >
      <span>Nombre: {nombre}</span>
      <br />
      <span>Sillas: {cantidad_sillas}</span>
    </div>
  );
};
