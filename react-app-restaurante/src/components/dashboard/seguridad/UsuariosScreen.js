import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../actions/ui.actions";
import {
  setActiveUser,
  startLoadingUsers,
} from "../../../actions/users.actions";
import { Table } from "../../../helpers/Table.helper";
import { UserModal } from "../../ui/modals/UserModal";

export const UsuariosScreen = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Código",
        accessor: "codigo",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Primer apellido",
        accessor: "apellido1",
      },
      {
        Header: "Segundo apellido",
        accessor: "apellido2",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
      },
      {
        Header: "Celular",
        accessor: "celular",
      },
      {
        Header: "Login",
        accessor: "login",
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  const handleOnclik = (user) => {
    //console.log(job);
    dispatch(setActiveUser(user));
    dispatch(openModal("users"));
  };

  const handleAdd = () => {
    dispatch(openModal("users"));
  };
  return (
    <div className="block animate__animated animate__fadeIn">
      <div className="column">
        <h1 className="title">Usuarios</h1>
      </div>
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <button
                className="button is-success is-rounded mb-3"
                type="button"
                onClick={handleAdd}
              >
                <i className="fas fa-user-plus mr-2"></i>
                Agregar
              </button>
              <Table columns={columns} data={users} onClick={handleOnclik} />
            </div>
          </div>
        </div>
      </div>
      <UserModal />
    </div>
  );
};
