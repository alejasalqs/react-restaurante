import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEmployee,
  deleteEmployee,
  removeActiveEmployee,
  startDeletingEmployee,
  startEmployeeAddNew,
} from "../../../actions/employees.actions";
import { closeModal } from "../../../actions/ui.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  cedula: "",
  nombre: "",
  apellido1: "",
  apellido2: "",
  telefono1: "",
  telefono2: "",
  puesto: "Lava Platos",
  restaurant: "Patitos SA",
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const EmpleadosModal = () => {
  const dispatch = useDispatch();
  const { empleadosModalOpen } = useSelector((state) => state.ui);
  const { activeEmployee } = useSelector((state) => state.employees);

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (activeEmployee) {
      setFormValues(activeEmployee);
    } else {
      setFormValues(initialValues);
    }
  }, [activeEmployee, setFormValues]);

  const { codigo, cedula, nombre, apellido1, apellido2, telefono1, telefono2 } =
    formValues;

  const [puestos, setPuestos] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("positions").then((resp) => {
      resp.json().then((data) => {
        setPuestos(data.position);
      });
    });

    fetchWithToken("restaurant").then((resp) => {
      resp.json().then((data) => {
        setRestaurantes(data.restaurants);
      });
    });
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  const handleCloseModal = () => {
    reset();
    dispatch(removeActiveEmployee());
    dispatch(closeModal("employees"));
  };

  const handleCancel = () => {
    reset();
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("restaurante");
    const restaurante = select.value;

    const select2 = document.getElementById("puesto");
    const puesto = select2.value;
    dispatch(
      startEmployeeAddNew({
        codigo,
        cedula,
        nombre,
        apellido1,
        apellido2,
        telefono1,
        telefono2,
        restaurante,
        puesto,
      })
    );
    handleCloseModal();
  };

  const editInformation = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    dispatch(startDeletingEmployee(activeEmployee.codigo));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={empleadosModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeEmployee ? (
        <h1 className="title"> Editar empleado </h1>
      ) : (
        <h1 className="title"> Agregar empleado </h1>
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
              readOnly={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Cédula</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="cedula"
              onChange={handleInputChange}
              value={cedula}
              placeholder="Cédula"
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
              <label className="label">Teléfono #1</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="telefono1"
                  onChange={handleInputChange}
                  value={telefono1}
                  placeholder="Teléfono #1"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Teléfono #2</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="telefono2"
                  onChange={handleInputChange}
                  value={telefono2}
                  placeholder="Teléfono #2"
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
                  <select id="puesto">
                    {puestos.map((p) => (
                      <option value={p._id} key={p._id}>
                        {p.nombre}
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
        </div>
        {activeEmployee ? (
          <div className="field is-grouped">
            <div className="control mr-2">
              <button
                className="button is-link"
                type="submit"
                onClick={editInformation}
              >
                <i className="fas fa-save mr-2"></i> Editar
              </button>
            </div>
            <div className="control mr-2">
              <button
                className="button is-link is-light"
                type="submit"
                onClick={handleDelete}
              >
                <i className="fas fa-window-close mr-2"></i>Eliminar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
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
                className="button is-link"
                type="submit"
                onClick={saveInformation}
              >
                <i className="fas fa-save mr-2"></i> Guardar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
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
