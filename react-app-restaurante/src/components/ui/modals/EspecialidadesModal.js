import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveEspecialidad,
  startDeletingEspecialidad,
  startEspecialidadAddNew,
} from "../../../actions/especialidades.actions";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  ingredientes: "",
  detalle: "",
  precio: "",
};
export const EspecialidadesModal = () => {
  const dispatch = useDispatch();
  const { especialidadesModalOpen } = useSelector((state) => state.ui);
  const { activeEspecialidad } = useSelector((state) => state.especialidades);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, ingredientes, detalle, precio } = formValues;

  useEffect(() => {
    if (activeEspecialidad) {
      setFormValues(activeEspecialidad);
    } else {
      setFormValues(initialValues);
    }
  }, [activeEspecialidad, setFormValues]);

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
    dispatch(closeModal("especialidades"));
    dispatch(removeActiveEspecialidad());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingEspecialidad(activeEspecialidad.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    dispatch(
      startEspecialidadAddNew({ nombre, ingredientes, detalle, precio })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={especialidadesModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeEspecialidad ? (
        <h1 className="title"> Editar especialidades </h1>
      ) : (
        <h1 className="title"> Agregar especialidades </h1>
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
        <div className="field">
          <label className="label">Ingredientes</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="ingredientes"
              onChange={handleInputChange}
              value={ingredientes}
              placeholder="ingredientes"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Detalle</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="detalle"
              onChange={handleInputChange}
              value={detalle}
              placeholder="detalle"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Cantidad</label>
          <div className="control">
            <input
              className="input"
              type="number"
              autoComplete="off"
              name="precio"
              onChange={handleInputChange}
              value={precio}
              placeholder="cantidad"
            />
          </div>
        </div>
        {activeEspecialidad ? (
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
