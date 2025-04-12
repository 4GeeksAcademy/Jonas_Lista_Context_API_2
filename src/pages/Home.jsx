import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { obtenerAgendas } from "../services/fetch.js";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;


  useEffect(() => {
  obtenerAgendas(dispatch)
    
  }, [dispatch]);

console.log(agendas)
 

  return (
    <div className="text-center mt-5">
      <h1>Lista de agendas</h1>
      <div>
        {agendas && agendas.length > 0 ? (
          agendas.map((item, index) => (  // mapear agendar y mostrar en el navegador * * * sin slug
            <pre key={index}>
              {JSON.stringify(item, null, 2)}
            </pre>
          ))
          ) : (
            <p>No hay agendas disponibles</p>
          )}
      </div>


    </div>
  );
};


// {
//   agendas && agendas.map((item, index) => (  // mapear agenda y mostrar en el navegador * * * sin slug
//     <div key={index} className="border p-3 my-2 rounded shadow">
//       <p><strong>Nombre:</strong> {item.full_name}</p>
//       <p><strong>Email:</strong> {item.email}</p>
//       <p><strong>Teléfono:</strong> {item.phone}</p>
//       <p><strong>Dirección:</strong> {item.address}</p>
//     </div>
//   ))
// }




 // const getGetAgendas = async () => {
  //   try {
  //     const respuesta = await fetch(
  //       "https://playground.4geeks.com/contact/agendas"
  //     );
  //     if (!respuesta.ok) {
  //       throw new Error("Error al obtener los datos");
  //     }
  //     const datosApi = await respuesta.json(); // else ?? * *
  //     setAgendas(datosApi);
  //   } catch (err) {
  //     console.error("Error al obtener los datos:", err);
  //   }
  // };

  // const crearAgenda = async () => {
  //   try {
  //     const response = await fetch("https://playground.4geeks.com/contact/agendas/jonas2", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Respuesta de la API:", response); // Depuración
  //     if (!response.ok) {
  //       const errorData = await response.json(); // Intenta obtener más detalles del error
  //       console.error("Error al crear la agenda:", errorData); // Depuración
  //       throw new Error(errorData.message || "Error al crear la agenda");
  //     }
  //     const data = await response.json();  // else ?? * *
  //     console.log("Agenda creada:", data); // Depuración
  //     // Despacha la acción para agregar la nueva agenda al estado
  //     setAgendas(
  //       data     
  //     );
  //     return data; // Devuelve la agenda creada
  //   } catch (error) {
  //     console.error("Error al crear la agenda, o ya existe :", error); // Depuración * * ¿cómo detecta su la agenda ya exite?
  //     throw error; // Relanza el error para manejarlo en el componente
  //   }
  // }