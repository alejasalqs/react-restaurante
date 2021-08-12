import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveCountry,
  startCountryAddNew,
  startDeletingCountry,
} from "../../../actions/country.actions";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  pais: "",
};
export const CountryModal = () => {
  const dispatch = useDispatch();
  const { countryModalOpen } = useSelector((state) => state.ui);
  const { activeCountry } = useSelector((state) => state.countries);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, pais } = formValues;

  useEffect(() => {
    if (activeCountry) {
      setFormValues(activeCountry);
    } else {
      setFormValues(initValues);
    }
  }, [activeCountry, setFormValues]);

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
    dispatch(closeModal("country"));
    dispatch(removeActiveCountry());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingCountry(activeCountry.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    dispatch(startCountryAddNew({ pais }));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={countryModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeCountry ? (
        <h1 className="title"> Editar país </h1>
      ) : (
        <h1 className="title"> Agregar país </h1>
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
              name="pais"
              onChange={handleInputChange}
              value={pais}
              placeholder="Nombre"
            />
          </div>
        </div>

        {activeCountry ? (
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
