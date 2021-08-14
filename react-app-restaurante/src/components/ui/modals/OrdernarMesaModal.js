import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveTable } from "../../../actions/tables.actions";
import { closeModal } from "../../../actions/ui.actions";
import { customStyles } from "../../../helpers/modal.customStyles";
import { fetchWithToken } from "../../../helpers/fetch.helper";
import moment from "moment";
import { startClienteAddNew } from "../../../actions/clients.actions";

// Agregar el modal al documento
Modal.setAppElement("#root");

export const OrdernarMesaModal = () => {
  const dispatch = useDispatch();
  const { ordenesModalOpen } = useSelector((state) => state.ui);
  const { activeTable } = useSelector((state) => state.tables);

  const initValuesClient = {
    codigocliente: "",
    nombre_completo: "",
    fecha: moment().format("L"),
    mesa: activeTable?.nombre || "",
    reservacion: false,
    barra: false,
  };

  const [formClientValues, setFormClientValues] = useState(initValuesClient);

  let {
    codigocliente,
    nombre_completo,
    fecha = moment().format("L"),
    mesa = activeTable.nombre || "",
    reservacion = false,
    monto_pagado = 0,
    barra = false,
  } = formClientValues;

  const [precio, setPrecio] = useState(0);

  const [formOrdersValues, setFormOrdersValues] = useState(initValuesClient);

  const { codigoorden, pedidos } = formOrdersValues;

  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    if (activeTable) {
      setFormClientValues(activeTable);
    } else {
      setFormClientValues(initValuesClient);
    }
  }, [activeTable, setFormClientValues]);

  useEffect(() => {
    obtenerDatosSelect();
  }, []);

  const obtenerDatosSelect = () => {
    Promise.all([
      fetchWithToken("specials/especialidades"),
      fetchWithToken("specials/buffet"),
    ]).then((resp) => {
      Promise.all([resp[0].json(), resp[1].json()]).then((data) => {
        const newArray = [...data[0].especiales, ...data[1].buffets];
        setEspecialidades(newArray);
      });
    });

    /*fetchWithToken("specials/especialidades").then((resp) => {
      resp.json().then((data) => {
        setEspecialidades({
          ...especialidades,
          ...data.especiales,
        });
      });
    });

    fetchWithToken("specials/buffet").then((resp) => {
      resp.json().then((data) => {
        setEspecialidades({
          ...especialidades,
          ...data.buffets,
        });
      });
    });*/
  };

  const handelChangeSelect = (e) => {
    setPrecio(parseInt(e.target.value));
  };

  const handleCloseModal = () => {
    dispatch(closeModal("ordenes"));
    dispatch(removeActiveTable());
    reset();
  };

  const handleInputChangeClient = ({ target }) => {
    setFormClientValues({
      ...formClientValues,
      [target.name]: target.value,
    });
  };

  const addNewPedido = () => {
    setFormClientValues({
      ...formClientValues,
      monto_pagado: monto_pagado + precio,
    });
    setPrecio(0);
  };

  const reset = () => {
    setFormClientValues(initValuesClient);
    setFormOrdersValues(initValuesClient);
    setPrecio(0);
  };

  const handleSaveInformation = (e) => {
    dispatch(
      startClienteAddNew({
        nombre_completo,
        fecha,
        mesa,
        reservacion,
        monto_pagado,
        barra,
      })
    );
    handleCloseModal();
  };
  return (
    <Modal
      isOpen={ordenesModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal modal-ordenes"
      overlayClassName="modal-fondo"
    >
      <h1 className="title">Ordenar</h1>
      <hr />
      <form>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Código</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="codigocliente"
                  placeholder="Código"
                  value={codigocliente}
                  onChange={handleInputChangeClient}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Cliente</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  name="nombre_completo"
                  onChange={handleInputChangeClient}
                  value={nombre_completo}
                  placeholder="Nombre completo"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Mesa</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="mesa"
                  placeholder="mesa"
                  readOnly={true}
                  value={mesa}
                  onChange={handleInputChangeClient}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Monto_pagado</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="monto_pagado"
                  placeholder="monto_pagado"
                  value={monto_pagado}
                  readOnly={true}
                  onChange={handleInputChangeClient}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Fecha</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="fecha"
                  placeholder="Fecha"
                  readOnly={true}
                  value={fecha}
                  onChange={handleInputChangeClient}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Código Mesa</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="codigo"
                  placeholder="Código"
                  readOnly={true}
                  value={activeTable?.codigo}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Pedido</label>
              <div className="control">
                <span className="select">
                  <select id="productos" onChange={handelChangeSelect}>
                    <option value="0">Seleccionar...</option>
                    {especialidades.map((e) => (
                      <option value={e.precio} key={e._id}>
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Precio</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="precio"
                  value={precio}
                  placeholder="0"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <button
              className="button is-info is-light"
              type="button"
              onClick={() => addNewPedido()}
            >
              Mas
            </button>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control mr-3">
            <button
              className="button is-success"
              type="button"
              onClick={() => handleSaveInformation()}
            >
              <i className="fas fa-save mr-2"></i> Guardar
            </button>
          </div>
          <div className="control">
            <button
              className="button is-danger is-light"
              type="button"
              onClick={() => {}}
            >
              <i className="fas fa-window-close mr-2"></i>Cancelar
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
