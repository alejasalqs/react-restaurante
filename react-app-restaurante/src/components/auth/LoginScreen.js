import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth.actions";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    login: "asalguero",
    password: "123456",
  });

  const { login, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(login, password);
    dispatch(startLogin(login, password));
  };
  return (
    <div className="column  is-half">
      <div class="card">
        <div class="card-content">
          <h1>Login</h1>
          <br />
          <div class="content">
            <form onSubmit={handleLogin}>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={handleInputChange}
                    name="login"
                  />
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
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    name="password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <button class="button is-primary">Iniciar Sesi??n</button>
            </form>
            <hr />
            <Link to="/auth/register">Crear Cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
