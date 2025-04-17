import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { obtenerAgendas } from "../services/fetch.js";
import { Link } from "react-router-dom";

function Agendas() {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;

  useEffect(() => {
    obtenerAgendas(dispatch);
  }, [dispatch]);
  console.log(agendas);


  const listaAgendas = agendas?.agendas || [];
  return (
    <div>
      <h3>Agendas</h3>
      <div>
        <ul>
        {listaAgendas.length === 0 ? (
          <p className="text-muted">No hay agendas disponibles.</p>
        ) : (
          <ul className="list-unstyled">
            {listaAgendas.map((agenda) => (
              <li key={agenda.id} className="mb-4 p-3 border rounded shadow-sm">
                <div className="text-start">
                  <Link
                    to={`/contactos/${agenda.slug}`}
                    className="text-decoration-none"
                  >
                    <h3 className="mb-2 text-primary">{agenda.slug}</h3>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        </ul>
      
        </div>
    </div>
  );
}

export default Agendas;
