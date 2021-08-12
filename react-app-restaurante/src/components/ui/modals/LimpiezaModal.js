import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveLimpieza,
  startDeletingLimpieza,
  startLimpiezaAddNew,
} from "../../../actions/limpieza.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  descripcion: "",
  cantidad: "",
  tipo: "",
  cantidad_medida: "",
  unidad_medida: "",
  marca: "",
};

export const LimpiezaModal = () => {
  const dispatch = useDispatch();
  const { limpiezaModalOpen } = useSelector((state) => state.ui);
  const { activeLimpieza } = useSelector((state) => state.limpieza);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, descripcion, cantidad, tipo, cantidad_medida } =
    formValues;

  useEffect(() => {
    if (activeLimpieza) {
      setFormValues(activeLimpieza);
    } else {
      setFormValues(initialValues);
    }
  }, [activeLimpieza, setFormValues]);

  const [marcas, setMarcas] = useState([]);

  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("brands").then((resp) => {
      resp.json().then((data) => {
        setMarcas(data.brands);
      });
    });

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
    dispatch(closeModal("limpieza"));
    dispatch(removeActiveLimpieza());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingLimpieza(activeLimpieza.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("marca");
    const marca = select.value;

    const select2 = document.getElementById("unidad");
    const unidad = select2.value;
    dispatch(
      startLimpiezaAddNew({
        nombre,
        descripcion,
        cantidad,
        tipo,
        cantidad_medida,
        unidad,
        marca,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={limpiezaModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeLimpieza ? (
        <h1 className="title"> Editar Limpieza </h1>
      ) : (
        <h1 className="title"> Agregar Limpieza </h1>
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
          <div className="column">
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
          </div>
          <div className="column">
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
          </div>
        </div>
        <div className="columns">
          <div className="column">
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
                  placeholder="tipo"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Marca</label>
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
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Cantidad Medida</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="cantidad_medida"
                  onChange={handleInputChange}
                  value={cantidad_medida}
                  placeholder="cantidad medida"
                />
              </div>
            </div>
          </div>
          <div className="column">
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
          </div>
        </div>

        {activeLimpieza ? (
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
