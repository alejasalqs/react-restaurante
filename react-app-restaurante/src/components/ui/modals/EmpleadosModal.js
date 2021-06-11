import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../actions/ui.actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Agregar el modal al documento
Modal.setAppElement("#root");

export const EmpleadosModal = () => {
  const dispatch = useDispatch();
  const { empleadosModalOpen } = useSelector((state) => state.ui);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      isOpen={empleadosModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Editar empleado </h1>
      <hr />
      <form className="container">
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
