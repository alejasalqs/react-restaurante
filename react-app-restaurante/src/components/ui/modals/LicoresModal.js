import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveLicores,
  startDeletingLicor,
  startLicorAddNew,
} from "../../../actions/licores.actions";
import { closeModal } from "../../../actions/ui.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";
import { customStyles } from "../../../helpers/modal.customStyles";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initValues = {
  codigo: "",
  nombre: "",
  cantidad: "",
  descripcion: "",
  marca: "",
  nacionalidad: "",
  precio_unitario: "",
  precio_botella: "",
};
export const LicoresModal = () => {
  const dispatch = useDispatch();
  const { licoresModalOpen } = useSelector((state) => state.ui);
  const { activeLicor } = useSelector((state) => state.licores);

  const [formValues, setFormValues] = useState(initValues);

  const {
    codigo,
    nombre,
    cantidad,
    descripcion,
    marca,
    nacionalidad,
    precio_unitario,
    precio_botella,
  } = formValues;

  useEffect(() => {
    if (activeLicor) {
      setFormValues(activeLicor);
    } else {
      setFormValues(initValues);
    }
  }, [activeLicor, setFormValues]);

  const [marcas, setMarcas] = useState([]);

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    fetchWithToken("brands").then((resp) => {
      resp.json().then((data) => {
        setMarcas(data.brands);
      });
    });

    fetchWithToken("countries").then((resp) => {
      resp.json().then((data) => {
        setPaises(data.countries);
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
    setFormValues(initValues);
  };

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal("licores"));
    dispatch(removeActiveLicores());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingLicor(activeLicor.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();

    const select = document.getElementById("marca");
    const marca = select.value;

    const select2 = document.getElementById("pais");
    const nacionalidad = select2.value;
    dispatch(
      startLicorAddNew({
        nombre,
        cantidad,
        descripcion,
        marca,
        nacionalidad,
        precio_unitario,
        precio_botella,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={licoresModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeLicor ? (
        <h1 className="title"> Editar licor </h1>
      ) : (
        <h1 className="title"> Agregar licor </h1>
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
              <label className="label">Cantidad</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  autoComplete="off"
                  name="cantidad"
                  onChange={handleInputChange}
                  value={cantidad}
                  placeholder="Cantidad"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Descripci??n</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="descripcion"
              onChange={handleInputChange}
              value={descripcion}
              placeholder="Descripci??n"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Precio</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  autoComplete="off"
                  name="precio_unitario"
                  onChange={handleInputChange}
                  value={precio_unitario}
                  placeholder="Precio"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Precio Botella</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  autoComplete="off"
                  name="precio_botella"
                  onChange={handleInputChange}
                  value={precio_botella}
                  placeholder="Precio"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Pa??s</label>
              <p className="control has-icons-left">
                <span className="select">
                  <select id="pais">
                    {paises.map((p) => (
                      <option value={p._id} key={p._id}>
                        {p.pais}
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

        {activeLicor ? (
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
