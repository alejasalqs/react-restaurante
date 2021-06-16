import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveTable } from "../../../actions/tables.actions";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: 4,
  nombre: "",
  numero: "",
  sillas: "",
  restaurant: "",
};

export const MesasModal = () => {
  const dispatch = useDispatch();
  const { tableModalOpen } = useSelector((state) => state.ui);
  const { activeTable } = useSelector((state) => state.tables);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, nombre, numero, sillas, restaurant } = formValues;

  useEffect(() => {
    if (activeTable) {
      setFormValues(activeTable);
    } else {
      setFormValues(initValues);
    }
  }, [activeTable, setFormValues]);

  const handleCloseModal = () => {
    //reset();
    dispatch(closeModal("tables"));
    dispatch(removeActiveTable());
  };

  const handleInputChange = () => {};

  const handleDelete = () => {};

  const handleCancel = () => {};

  const saveInformation = () => {};

  const editInformation = () => {};

  return (
    <Modal
      isOpen={tableModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeTable ? (
        <h1 className="title"> Editar mesa </h1>
      ) : (
        <h1 className="title"> Agregar mesa </h1>
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
          <label className="label">Numero</label>
          <div className="control">
            <input
              className="input"
              type="number"
              autoComplete="off"
              name="numero"
              id="numero"
              onChange={handleInputChange}
              value={numero}
              placeholder="Rol Externo o Interno"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Sillas</label>
          <div className="control">
            <input
              className="input"
              type="number"
              autoComplete="off"
              name="sillas"
              id="sillas"
              onChange={handleInputChange}
              value={sillas}
              placeholder="Rol Externo o Interno"
            />
          </div>
        </div>
        {activeTable ? (
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
