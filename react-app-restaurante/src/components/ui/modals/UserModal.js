import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../actions/ui.actions";
import {
  removeActiveUser,
  startDeletingUser,
  startUserAddNew,
} from "../../../actions/users.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  nombre: "",
  apellido1: "",
  apellido2: "",
  telefono: "",
  celular: "",
  login: "",
  password: "",
};

export const UserModal = () => {
  const dispatch = useDispatch();
  const { userModalOpen } = useSelector((state) => state.ui);
  const { activeUser } = useSelector((state) => state.users);

  const [formValues, setFormValues] = useState(initValues);

  const {
    codigo,
    nombre,
    apellido1,
    apellido2,
    telefono,
    celular,
    login,
    password,
  } = formValues;

  useEffect(() => {
    if (activeUser) {
      setFormValues(activeUser);
    } else {
      setFormValues(initValues);
    }
  }, [activeUser, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("restaurant").then((resp) => {
      resp.json().then((data) => {
        setRestaurantes(data.restaurants);
      });
    });
  };

  const reset = () => {
    setFormValues(initValues);
  };

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal("users"));
    dispatch(removeActiveUser());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingUser(activeUser.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("restaurante");
    const restaurante = select.value;

    const select2 = document.getElementById("tipo_usuario");
    const tipo_usuario = select2.value;
    dispatch(
      startUserAddNew({
        nombre,
        apellido1,
        apellido2,
        telefono,
        celular,
        login,
        password,
        restaurante,
        tipo_usuario,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={userModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeUser ? (
        <h1 className="title"> Editar Usuario </h1>
      ) : (
        <h1 className="title"> Agregar Usuario </h1>
      )}
      <hr />
      <form>
        <div className="field">
          <label className="label">Código</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="codigo"
              onChange={handleInputChange}
              value={codigo}
              placeholder="Código"
              readOnly="true"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="nombre"
                  onChange={handleInputChange}
                  value={nombre}
                  placeholder="Nombre"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Primer Apellido</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="apellido1"
                  onChange={handleInputChange}
                  value={apellido1}
                  placeholder="Primer Apellido"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Segundo Apellido</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="apellido2"
                  onChange={handleInputChange}
                  value={apellido2}
                  placeholder="Segundo Apellido"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Teléfono</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="telefono"
                  onChange={handleInputChange}
                  value={telefono}
                  placeholder="Teléfono"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Celuar</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="celular"
                  onChange={handleInputChange}
                  value={celular}
                  placeholder="Celular"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Login</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="login"
                  onChange={handleInputChange}
                  value={login}
                  placeholder="Login"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="password"
                  onChange={handleInputChange}
                  value={password}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <p className="control has-icons-left">
                <span className="select">
                  <select id="restaurante">
                    {restaurantes.map((r) => (
                      <option value={r._id} key={r._id}>
                        {r.nombre}
                      </option>
                    ))}
                  </select>
                </span>
                <span className="icon is-small is-left">
                  <i className="fas fa-globe"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <p className="control has-icons-left">
                <span className="select">
                  <select id="tipo_usuario">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </span>
                <span className="icon is-small is-left">
                  <i className="fas fa-globe"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        {activeUser ? (
          <div className="field is-grouped">
            <div className="control mr-2">
              <button
                className="button is-warning"
                type="submit"
                onClick={editInformation}
              >
                <i className="fas fa-edit" mr-2></i> Editar
              </button>
            </div>
            <div className="control mr-2">
              <button
                className="button is-danger"
                type="submit"
                onClick={handleDelete}
              >
                <i class="fas fa-trash mr-2"></i>Eliminar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light"
                type="button"
                onClick={handleCancel}
              >
                <i className="fas fa-window-close mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="field is-grouped">
            <div className="control mr-3">
              <button
                className="button is-success"
                type="submit"
                onClick={saveInformation}
              >
                <i className="fas fa-save mr-2"></i> Guardar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light"
                type="button"
                onClick={handleCancel}
              >
                <i className="fas fa-window-close mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
