import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveDesechable,
  startDeletingDesechable,
  startDesechablesAddNew,
} from "../../../actions/desechables.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  cantidad: "",
  descripcion: "",
  marca: "",
};
export const DesechablesModal = () => {
  const dispatch = useDispatch();
  const { desechablesModalOpen } = useSelector((state) => state.ui);
  const { activeDesechable } = useSelector((state) => state.desechables);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, cantidad, descripcion } = formValues;

  useEffect(() => {
    if (activeDesechable) {
      setFormValues(activeDesechable);
    } else {
      setFormValues(initialValues);
    }
  }, [activeDesechable, setFormValues]);

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("brands").then((resp) => {
      resp.json().then((data) => {
        setMarcas(data.brands);
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
    dispatch(closeModal("desechables"));
    dispatch(removeActiveDesechable());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingDesechable(activeDesechable.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("marca");
    const marca = select.value;
    dispatch(startDesechablesAddNew({ nombre, cantidad, descripcion, marca }));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={desechablesModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeDesechable ? (
        <h1 className="title"> Editar Desechable </h1>
      ) : (
        <h1 className="title"> Agregar Desechable </h1>
      )}
      <hr />
      <form>
        <div className="field">
          <label className="label">C??digo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="codigo"
              onChange={handleInputChange}
              value={codigo}
              placeholder="C??digo"
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
          <label className="label">Descripcion</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="descripcion"
              onChange={handleInputChange}
              value={descripcion}
              placeholder="Descripcion"
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
              name="cantidad"
              onChange={handleInputChange}
              value={cantidad}
              placeholder="cantidad"
            />
          </div>
        </div>
        <div className="column">
          <div className="field">
            <p className="control has-icons-left">
              <span className="select">
                <select id="marca">
                  {marcas.map((m) => (
                    <option value={m._id} key={m._id}>
                      {m.nombre}
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
        {activeDesechable ? (
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
