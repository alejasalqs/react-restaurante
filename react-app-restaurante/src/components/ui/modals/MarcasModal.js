import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import {
  removeActiveBrand,
  startDeletingBrand,
  startMarcaAddNew,
} from "../../../actions/marcas.actions";
import { fetchWithToken } from "../../../helpers/fetch.helper";

// Agregar el modal al documento
Modal.setAppElement("#root");

const initialValues = {
  codigo: "",
  nombre: "",
  descripcion: "",
  nacionalidad: "",
  empresa: "",
  telefono_empresa: "",
};

export const MarcasModal = () => {
  const dispatch = useDispatch();
  const { brandsModalOpen } = useSelector((state) => state.ui);
  const { activeBrand } = useSelector((state) => state.brands);

  const [formValues, setFormValues] = useState(initialValues);

  const { codigo, nombre, descripcion, empresa, telefono_empresa } = formValues;

  useEffect(() => {
    if (activeBrand) {
      setFormValues(activeBrand);
    } else {
      setFormValues(initialValues);
    }
  }, [activeBrand, setFormValues]);

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
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
    setFormValues(initialValues);
  };

  const handleCloseModal = () => {
    reset();
    dispatch(closeModal("brands"));
    dispatch(removeActiveBrand());
  };

  const editInformation = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    dispatch(startDeletingBrand(activeBrand.codigo));
    handleCloseModal();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const saveInformation = (e) => {
    e.preventDefault();
    const select = document.getElementById("nacionalidad");
    const nacionalidad = select.value;
    //console.log(nombre, descripcion, nacionalidad, empresa, telefono_empresa);
    dispatch(
      startMarcaAddNew({
        nombre,
        descripcion,
        nacionalidad,
        empresa,
        telefono_empresa,
      })
    );
    handleCloseModal();
  };

  return (
    <Modal
      isOpen={brandsModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      {activeBrand ? (
        <h1 className="title"> Editar Marca </h1>
      ) : (
        <h1 className="title"> Agregar Marca </h1>
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
          <label className="label">Descripcion</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="descripcion"
              id="rol"
              onChange={handleInputChange}
              value={descripcion}
              placeholder="Descripcion"
            />
          </div>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <span className="select">
              <select id="nacionalidad">
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
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Empresa</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="empresa"
                  onChange={handleInputChange}
                  value={empresa}
                  placeholder="Empresa"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Teléfono Empresa</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="telefono_empresa"
                  onChange={handleInputChange}
                  value={telefono_empresa}
                  placeholder="Teléfono Empresa"
                />
              </div>
            </div>
          </div>
        </div>
        {activeBrand ? (
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
