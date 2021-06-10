import React from "react";

export const Loading = () => {
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div class="message is-info">
          <div class="message-header">Cargando...</div>
          <div class="message-body has-text-centered">
            <i class="fas fa-spinner fa-5x fa-spin"></i>
            <br />
            <br />
            Por favor espere.
          </div>
        </div>
      </div>
    </div>
  );
};
