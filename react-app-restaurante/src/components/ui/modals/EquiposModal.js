import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveEquipos,
  startDeletingEquipo,
  startEquiposAddNew,
} from "../../../actions/equipos.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  cantidad: "",
  precio: "",
  marca: "",
};

export const EquiposModal = () => {
  const dispatch = useDispatch();
  const { equiposModalOpen } = useSelector((state) => state.ui);
  const { activeEquipos } = useSelector((state) => state.equipos);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, cantidad, precio } = formValues;

  useEffect(() => {
    if (activeEquipos) {
      setFormValues(activeEquipos);
    } else {
      setFormValues(initialValues);
    }
  }, [activeEquipos, setFormValues]);

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
    dispatch(closeModal("equipos"));
    dispatch(removeActiveEquipos());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingEquipo(activeEquipos.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("marca");
    const marca = select.value;
    dispatch(startEquiposAddNew({ codigo, nombre, cantidad, precio, marca }));
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={equiposModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeEquipos ? (
        <h1 className="title"> Editar Equipos </h1>
      ) : (
        <h1 className="title"> Agregar Equipos </h1>
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
              placeholder="precio"
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
        {activeEquipos ? (
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
                type="buttton"
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
