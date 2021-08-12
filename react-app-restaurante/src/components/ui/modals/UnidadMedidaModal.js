import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../actions/ui.actions";
import {
  removeActiveUnidadMedida,
  startDeletingUnidadMedida,
  startUnidadMedidaAddNew,
} from "../../../actions/unidad-medida.action";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  unidad: "",
  detalle: "",
  escala: "",
  simbolo: "",
  simbologia: "",
};

export const UnidadMedidaModal = () => {
  const dispatch = useDispatch();
  const { unidadMedidaModalOpen } = useSelector((state) => state.ui);
  const { activeUnidadMedida } = useSelector((state) => state.unidadMedida);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, unidad, detalle, escala, simbolo, simbologia } = formValues;

  useEffect(() => {
    if (activeUnidadMedida) {
      setFormValues(activeUnidadMedida);
    } else {
      setFormValues(initValues);
    }
  }, [activeUnidadMedida, setFormValues]);

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
    dispatch(closeModal("unidad_medida"));
    dispatch(removeActiveUnidadMedida());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingUnidadMedida(activeUnidadMedida.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    dispatch(
      startUnidadMedidaAddNew({ unidad, detalle, escala, simbolo, simbologia })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={unidadMedidaModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeUnidadMedida ? (
        <h1 className="title"> Editar Unidad Medida </h1>
      ) : (
        <h1 className="title"> Agregar Unidad Medida </h1>
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
          <label className="label">Unidad Medida</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="unidad"
              onChange={handleInputChange}
              value={unidad}
              placeholder="Unidad Medida"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Escala</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="escala"
              id="escala"
              onChange={handleInputChange}
              value={escala}
              placeholder="Escala"
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
              id="detalle"
              onChange={handleInputChange}
              value={detalle}
              placeholder="Detalle"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Simbolo</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="simbolo"
                  onChange={handleInputChange}
                  value={simbolo}
                  placeholder="Simbolo"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Simbología</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="simbologia"
                  onChange={handleInputChange}
                  value={simbologia}
                  placeholder="Simbología"
                />
              </div>
            </div>
          </div>
        </div>
        {activeUnidadMedida ? (
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
