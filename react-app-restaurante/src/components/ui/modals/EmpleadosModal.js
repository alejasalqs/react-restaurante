import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmployee } from "../../../actions/employees.actions";
import { closeModal } from "../../../actions/ui.actions";
import { useForm } from "../../../hooks/useForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Agregar el modal al documento
Modal.setAppElement("#root");

export const EmpleadosModal = () => {
  const dispatch = useDispatch();
  const { empleadosModalOpen } = useSelector((state) => state.ui);
  const { activeEmployee } = useSelector((state) => state.employees);

  const [formValues, handleInputChange, reset] = useForm({
    codigo: 4,
    cedula: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    puesto: "Lava Platos",
    restaurant: "Patitos SA",
  });

  const {
    codigo,
    cedula,
    nombre,
    apellido1,
    apellido2,
    telefono,
    puesto,
    restaurant,
  } = formValues;

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    reset();
    dispatch(closeModal());
  };

  const saveInformation = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(addNewEmployee(formValues));
    handleCloseModal();
  };

  const editInformation = (e) => {
    e.preventDefault();
  };

  const handleDelete = (e) => {
    e.preventDefault();
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
        <div class="field">
          <label class="label">Código</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="codigo"
              onChange={handleInputChange}
              value={codigo}
              placeholder="Código"
              readOnly="true"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Cédula</label>
          <div class="control">
            <input
              class="input"
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
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input
                  class="input"
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
            <div class="field">
              <label class="label">Primer Apellido</label>
              <div class="control">
                <input
                  class="input"
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
            <div class="field">
              <label class="label">Segundo Apellido</label>
              <div class="control">
                <input
                  class="input"
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
            <div class="field">
              <label class="label">Teléfono #1</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  autoComplete="off"
                  name="telefono"
                  onChange={handleInputChange}
                  value={telefono}
                  placeholder="Teléfono #1"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <label class="label">Teléfono #2</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  autoComplete="off"
                  name=""
                  onChange={handleInputChange}
                  placeholder="Teléfono #2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div class="field">
              <p class="control has-icons-left">
                <span class="select">
                  <select onChange={handleInputChange}>
                    <option selected>Puesto</option>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <p class="control has-icons-left">
                <span class="select">
                  <select>
                    <option selected>Restaurante</option>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        {activeEmployee ? (
          <div class="field is-grouped">
            <div class="control mr-2">
              <button
                class="button is-link"
                type="submit"
                onClick={editInformation}
              >
                <i class="fas fa-save mr-2"></i> Editar
              </button>
            </div>
            <div class="control mr-2">
              <button
                class="button is-link is-light"
                type="submit"
                onClick={handleDelete}
              >
                <i class="fas fa-window-close mr-2"></i>Eliminar
              </button>
            </div>
            <div class="control">
              <button
                class="button is-link is-light"
                type="button"
                onClick={handleCancel}
              >
                <i class="fas fa-window-close mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div class="field is-grouped">
            <div class="control mr-3">
              <button
                class="button is-link"
                type="submit"
                onClick={saveInformation}
              >
                <i class="fas fa-save mr-2"></i> Guardar
              </button>
            </div>
            <div class="control">
              <button
                class="button is-link is-light"
                type="button"
                onClick={handleCancel}
              >
                <i class="fas fa-window-close mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
