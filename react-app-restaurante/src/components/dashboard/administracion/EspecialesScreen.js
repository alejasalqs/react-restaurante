import React, { useState } from "react";
import { BuffetScreen } from "../../ui/sections/BuffetScreen";
import { EspecialidadesScreen } from "../../ui/sections/EspecialidadesScreen";

export const EspecialesScreen = () => {
  const [showProducto, setShowProducto] = useState("BUFFET");

  const changeShowProduct = (e) => {
    setShowProducto(e.target.value);
  };

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Especiales</h1>
      </div>
      <div className="column">
        <div className="select">
          <select onChange={changeShowProduct}>
            <option value="BUFFET">Buffets</option>
            <option value="ESPECIALIDADES">Especialidades</option>
            <option value="BCALIENTES">Bebidas Calientes</option>
            <option value="BHELADAS">Bebidas Heladas</option>
            <option value="BGASEOSAS">Bebidas Gaseosas</option>
            <option value="LICORES">Licores</option>
            <option value="VINOS">Vinos</option>
          </select>
        </div>
      </div>
      {(function () {
        switch (showProducto) {
          case "BUFFET":
            return <BuffetScreen />;

          case "ESPECIALIDADES":
            return <EspecialidadesScreen />;

          default:
            return <BuffetScreen />;
        }
      })()}
    </div>
  );
};
