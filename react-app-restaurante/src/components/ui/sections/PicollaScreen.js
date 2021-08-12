import React, { useEffect, useState } from "react";
import { fetchWithToken } from "../../../helpers/fetch.helper";

export const PicollaScreen = ({ idrestaurante }) => {
  const [mesas, setMesas] = useState([]);
  useEffect(() => {
    console.log("HOLAAA", idrestaurante);
    obtenerMesas();
    console.log(mesas);
  }, []);

  const obtenerMesas = () => {
    fetchWithToken(`tables/${idrestaurante}`).then((resp) => {
      resp.json((data) => {
        setMesas(data.tables);
      });
    });
  };
  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <article class="message is-success">
                    <div class="message-body">Mesas disponibles: 0</div>
                  </article>
                </div>
                <div className="column">
                  <article class="message is-warning">
                    <div class="message-body">Mesas reservadas: 0</div>
                  </article>
                </div>
                <div className="column">
                  <article class="message is-danger">
                    <div class="message-body">Mesas ocupadas: 0</div>
                  </article>
                </div>
              </div>
            </div>
            <div className="column">
              {mesas.map((m) => (
                <a>{m.nombre}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
