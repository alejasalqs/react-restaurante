import React, { useState } from "react";
import { PicollaScreen } from "./PicollaScreen";

export const AdministracionMesasScreen = () => {
  const [showRestaurante, setShowRestaurante] = useState("BUFFET");

  const changeShowProduct = (e) => {
    setShowRestaurante(e.target.value);
  };
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Restaurantes</h1>
      </div>
      <div className="column">
        <div className="select">
          <select onChange={changeShowProduct}>
            <option value="60f8dde43b32a116cad0f745">Turin Anivo</option>
            <option value="6115b1fa3829bd0355a6578b">Notte Di Fuoco</option>
            <option value="60f8ddce3b32a116cad0f744">Picolla Stella</option>
          </select>
        </div>
      </div>
      {(function () {
        switch (showRestaurante) {
          case "60f8ddce3b32a116cad0f744":
            return <PicollaScreen idrestaurante={"60f8ddce3b32a116cad0f744"} />;

          default:
            return <PicollaScreen idrestaurante={"60f8ddce3b32a116cad0f744"} />;
        }
      })()}
    </div>
  );
};
