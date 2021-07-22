import React, { useState } from "react";
import { ProductosComestiblesScreen } from "../../ui/sections/ProductosComestiblesScreen";
import { ProductosDesechablesScreen } from "../../ui/sections/ProductosDesechablesScreen";
import { ProductosEquiposScreen } from "../../ui/sections/ProductosEquiposScreen";
import { ProductosLimpiezaScreen } from "../../ui/sections/ProductosLimpiezaScreen";
import { ProductosTecnologiaScreen } from "../../ui/sections/ProductosTecnologiaScreen";

export const ProductosScreen = () => {
  const [showProducto, setShowProducto] = useState("COMESTIBLES");

  const changeShowProduct = (e) => {
    setShowProducto(e.target.value);
  };

  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Productos</h1>
      </div>
      <div className="column">
        <div className="select">
          <select onChange={changeShowProduct}>
            <option value="COMESTIBLES">Comestibles</option>
            <option value="DESECHABLES">Desechables y Empaques</option>
            <option value="LIMPIEZA">Limpieza y Higiene</option>
            <option value="TECNO">Tecnología</option>
            <option value="EQUIPOS">Equipos y Utensilios</option>
          </select>
        </div>
      </div>
      {(function () {
        switch (showProducto) {
          case "COMESTIBLES":
            return <ProductosComestiblesScreen />;
          case "DESECHABLES":
            return <ProductosDesechablesScreen />;
          case "LIMPIEZA":
            return <ProductosLimpiezaScreen />;
          case "TECNO":
            return <ProductosTecnologiaScreen />;
          case "EQUIPOS":
            return <ProductosEquiposScreen />;
          default:
            return <ProductosComestiblesScreen />;
        }
      })()}
    </div>
  );
};
