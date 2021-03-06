import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveBuffet,
  startBuffetAddNew,
  startDeletingBuffet,
} from "../../../actions/buffet.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  tipo: "",
  precio: "",
  unidad_medida: "",
};
export const BuffetModal = () => {
  const dispatch = useDispatch();
  const { buffetModalOpen } = useSelector((state) => state.ui);
  const { activeBuffet } = useSelector((state) => state.buffets);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, tipo_comida, precio } = formValues;

  useEffect(() => {
    if (activeBuffet) {
      setFormValues(activeBuffet);
    } else {
      setFormValues(initialValues);
    }
  }, [activeBuffet, setFormValues]);

  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("unidades-medida").then((resp) => {
      resp.json().then((data) => {
        setUnidades(data.unidad_medida);
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
    dispatch(closeModal("buffets"));
    dispatch(removeActiveBuffet());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingBuffet(activeBuffet.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select2 = document.getElementById("unidad");
    const unidad_medida = select2.value;
    dispatch(startBuffetAddNew({ unidad_medida, precio, nombre, tipo_comida }));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={buffetModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeBuffet ? (
        <h1 className="title"> Editar Buffets </h1>
      ) : (
        <h1 className="title"> Agregar Buffets </h1>
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
          <label className="label">Tipo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="tipo_comida"
              onChange={handleInputChange}
              value={tipo_comida}
              placeholder="Tipo"
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
        <div className="field">
          <label className="label">Unidad Medida</label>
          <p className="control has-icons-left">
            <span className="select">
              <select id="unidad">
                {unidades.map((u) => (
                  <option value={u._id} key={u._id}>
                    {u.unidad}
                  </option>
                ))}
              </select>
            </span>
            <span className="icon is-small is-left">
              <i className="fas fa-globe"></i>
            </span>
          </p>
        </div>
        {activeBuffet ? (
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
