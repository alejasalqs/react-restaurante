import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLoading } from "../../actions/tables.actions";
import { fetchWithToken } from "../../helpers/fetch.helper";
import { MesasCard } from "../ui/MesasCard";
import { OrdernarMesaModal } from "../ui/modals/OrdernarMesaModal";

export const HomeScreen = () => {
  //const [mesas, setMesas] = useState([]);
  useEffect(() => {
    //console.log("HOLAAA", idrestaurante);
    obtenerMesas();
    //console.log(mesas);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
  }, [dispatch]);

  const { tables } = useSelector((state) => state.tables);

  const obtenerMesas = () => {
    /*fetchWithToken`tables/${idrestaurante}`).then((resp) => {
      resp.json((data) => {
        setMesas(data.tables);
      });
    });*/
  };
  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <article className="message is-success">
                    <div className="message-body">Mesas disponibles: 0</div>
                  </article>
                </div>
                <div className="column">
                  <article className="message is-warning">
                    <div className="message-body">Mesas reservadas: 0</div>
                  </article>
                </div>
                <div className="column">
                  <article className="message is-danger">
                    <div className="message-body">Mesas ocupadas: 0</div>
                  </article>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns is-mobile">
                {tables.map((m) => (
                  <div className="column">
                    <MesasCard {...m} key={m._id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrdernarMesaModal />
    </div>
  );
};
