import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeActiveBebidaGaseosa,
  startBebidaGaseosaAddNew,
  startDeletingBebidaGaseosa,
} from "../../../actions/bebidas-gaseosa.action";

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
  precio: "",
};
export const BebidaGaseosaModal = () => {
  const dispatch = useDispatch();
  const { bebidasGaseosasModalOpen } = useSelector((state) => state.ui);
  const { activeBebidaGaseosa } = useSelector((state) => state.bebidas_gaseosa);

  const [formValues, setFormValues] = useState(initValues);

  const { codigo, nombre, cantidad, descripcion, marca, nacionalidad, precio } =
    formValues;

  useEffect(() => {
    if (activeBebidaGaseosa) {
      setFormValues(activeBebidaGaseosa);
    } else {
      setFormValues(initValues);
    }
  }, [activeBebidaGaseosa, setFormValues]);

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
    dispatch(closeModal("bebidasgaseosas"));
    dispatch(removeActiveBebidaGaseosa());
  };

  const editInformation = (e) => {
    e.preventDefault();
    //dispatch(updateJob(formValues));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(startDeletingBebidaGaseosa(activeBebidaGaseosa.codigo));
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
      startBebidaGaseosaAddNew({
        nombre,
        cantidad,
        descripcion,
        marca,
        nacionalidad,
        precio,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={bebidasGaseosasModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeBebidaGaseosa ? (
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
                  name="precio"
                  onChange={handleInputChange}
                  value={precio}
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

        {activeBebidaGaseosa ? (
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
