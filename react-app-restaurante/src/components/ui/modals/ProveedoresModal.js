import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import { removeActiveSupplier } from "../../../actions/proveedores.actions";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  nombre: "",
  apellido1: "",
  apellido2: "",
  telefono: "",
  fax: "",
};

export const ProveedoresModal = () => {
  const dispatch = useDispatch();
  const { supplierModalOpen } = useSelector((state) => state.ui);
  const { activeSupplier } = useSelector((state) => state.suppliers);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, nombre, apellido1, apellido2, telefono, fax } = formValues;

  useEffect(() => {
    if (activeSupplier) {
      setFormValues(activeSupplier);
    } else {
      setFormValues(initValues);
    }
  }, [activeSupplier, setFormValues]);

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
    dispatch(closeModal("suppliers"));
    dispatch(removeActiveSupplier());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    //dispatch(startDeletingJob(activeSupplier.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    //dispatch(startJobsAddNew(nombre, rol));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={supplierModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeSupplier ? (
        <h1 className="title"> Editar Proveedor </h1>
      ) : (
        <h1 className="title"> Agregar Proveedor </h1>
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
          <label className="label">Primer Apellido</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="apellido1"
              id="apellido1"
              onChange={handleInputChange}
              value={apellido1}
              placeholder="Primer Apellido"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Segundo Apellido</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="apellido2"
              id="apellido2"
              onChange={handleInputChange}
              value={apellido2}
              placeholder="Segundo Apellido"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Teléfono</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="telefono"
              id="telefono"
              onChange={handleInputChange}
              value={telefono}
              placeholder="Teléfono"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Fax</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="fax"
              id="fax"
              onChange={handleInputChange}
              value={fax}
              placeholder="Fax"
            />
          </div>
        </div>
        {activeSupplier ? (
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
