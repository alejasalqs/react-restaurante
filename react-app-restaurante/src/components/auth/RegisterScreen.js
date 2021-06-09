import React from "react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <div className="column  is-half">
      <div class="card">
        <div class="card-content">
          <h1>Registro</h1>
          <br />
          <div class="content">
            <form>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input" type="email" placeholder="Email" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <button class="button is-primary">Enviar datos</button>
            </form>
            <hr />
            <Link to="/auth/login">Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
