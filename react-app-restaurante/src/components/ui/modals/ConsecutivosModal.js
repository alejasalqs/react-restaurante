import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import { removeActiveConsecutivo } from "../../../actions/consecutivos.actions";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  tipo: "",
  descripcion: "",
  valor_consecutivo: "",
  contiene_prefijo: "",
  prefijo: "",
};

export const ConsecutivosModal = () => {
  const dispatch = useDispatch();
  const { consecutivoModalOpen } = useSelector((state) => state.ui);
  const { activeConsecutivo } = useSelector((state) => state.consecutivos);

  const [formValues, setFormValues] = useState(initialValues);

  const {
    codigo,
    tipo,
    descripcion,
    valor_consecutivo,
    contiene_prefijo,
    prefijo,
  } = formValues;

  useEffect(() => {
    if (activeConsecutivo) {
      setFormValues(activeConsecutivo);
    } else {
      setFormValues(initialValues);
    }
  }, [activeConsecutivo, setFormValues]);

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
    dispatch(closeModal("consecutivos"));
    dispatch(removeActiveConsecutivo());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    //dispatch(startDeletingJob(activeConsecutivo.codigo));
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
      isOpen={consecutivoModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeConsecutivo ? (
        <h1 className="title"> Editar Consecutivo </h1>
      ) : (
        <h1 className="title"> Agregar Consecutivo </h1>
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
          <label className="label">Tipo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="tipo"
              onChange={handleInputChange}
              value={tipo}
              placeholder="Tipo"
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
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Valor</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="valor_consecutivo"
                  onChange={handleInputChange}
                  value={valor_consecutivo}
                  placeholder="Valor"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Prefijo</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="prefijo"
                  onChange={handleInputChange}
                  value={prefijo}
                  placeholder="Prefijo"
                />
              </div>
            </div>
          </div>
        </div>

        {activeConsecutivo ? (
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
