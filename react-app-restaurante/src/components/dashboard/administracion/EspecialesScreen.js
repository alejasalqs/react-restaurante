import React, { useState } from "react";
import { BebidasCalienteScreen } from "../../ui/sections/BebidasCalienteScreen";
import { BebidasGaseosasScreen } from "../../ui/sections/BebidasGaseosasScreen";
import { BebidasHeladasScreen } from "../../ui/sections/BebidasHeladasScreen";
import { BuffetScreen } from "../../ui/sections/BuffetScreen";
import { EspecialidadesScreen } from "../../ui/sections/EspecialidadesScreen";
import { LicoresScreen } from "../../ui/sections/LicoresScreen";
import { VinosScreen } from "../../ui/sections/VinosScreen";

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

          case "BCALIENTES":
            return <BebidasCalienteScreen />;

          case "BHELADAS":
            return <BebidasHeladasScreen />;

          case "BGASEOSAS":
            return <BebidasGaseosasScreen />;

          case "LICORES":
            return <LicoresScreen />;

          case "VINOS":
            return <VinosScreen />;

          default:
            return <BuffetScreen />;
        }
      })()}
    </div>
  );
};
