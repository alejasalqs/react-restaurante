import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveJob } from "../../../actions/jobs.actions";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: 4,
  nombre: "",
  rol: "",
};

export const PuestosModal = () => {
  const dispatch = useDispatch();
  const { puestosModalOpen } = useSelector((state) => state.ui);
  const { activeJob } = useSelector((state) => state.jobs);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, nombre, rol } = formValues;

  useEffect(() => {
    if (activeJob) {
      setFormValues(activeJob);
    } else {
      setFormValues(initValues);
    }
  }, [activeJob, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleCloseModal = () => {
    dispatch(closeModal("jobs"));
    dispatch(removeActiveJob());
  };

  const editInformation = () => {};

  const handleDelete = () => {};

  const handleCancel = () => {};

  const saveInformation = () => {};

  return (
    <Modal
      isOpen={puestosModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeJob ? (
        <h1 className="title"> Editar puesto </h1>
      ) : (
        <h1 className="title"> Agregar puesto </h1>
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
        </div>
        {activeJob ? (
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
