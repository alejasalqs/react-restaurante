import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveBebidaCaliente,
  startBebidaCalienteAddNew,
  startDeletingBebidaCaliente,
} from "../../../actions/bebidas-calientes.action";

import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  nombre: "",
  ingredientes: "",
  descripcion: "",
  precio: "",
};
export const BebidaCalienteModal = () => {
  const dispatch = useDispatch();
  const { bebidasCalientesModalOpen } = useSelector((state) => state.ui);
  const { activeBebidaCaliente } = useSelector(
    (state) => state.bebidas_calientes
  );

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, nombre, ingredientes, descripcion, precio } = formValues;

  useEffect(() => {
    if (activeBebidaCaliente) {
      setFormValues(activeBebidaCaliente);
    } else {
      setFormValues(initValues);
    }
  }, [activeBebidaCaliente, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setFormValues(initValues);
  };

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal("bebidascalientes"));
    dispatch(removeActiveBebidaCaliente());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingBebidaCaliente(activeBebidaCaliente.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    dispatch(
      startBebidaCalienteAddNew({
        nombre,
        ingredientes,
        descripcion,
        precio,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={bebidasCalientesModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeBebidaCaliente ? (
        <h1 className="title"> Editar bebida </h1>
      ) : (
        <h1 className="title"> Agregar bebida </h1>
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
              placeholder="Ingredientes"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="descripcion"
              onChange={handleInputChange}
              value={descripcion}
              placeholder="Descripción"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Precio</label>
          <div className="control">
            <input
              className="input"
              type="number"
              autoComplete="off"
              name="precio"
              onChange={handleInputChange}
              value={precio}
              placeholder="Precio"
            />
          </div>
        </div>

        {activeBebidaCaliente ? (
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
