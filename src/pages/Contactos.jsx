import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import {obtenerContactos, actualizarContacto, eliminarContacto,
} from "../services/fetch.js";
import { Link } from "react-router-dom";

function Contactos() {
  const { store, dispatch } = useGlobalReducer();
  const { slug } = useParams(); // Obtén el slug de la URL
  const { agendas, contacts } = store;
  // Estado para manejar la edición del contacto
  const [editingContact, setEditingContact] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [loadingAgenda, setLoadingAgenda] = useState(true); // Estado para manejar la carga de la agenda
  // Protección: para buscar la agenda y si no hay agenda devuelve un null
  const agenda = Array.isArray(agendas)
    ? agendas.find((agenda) => agenda.slug === slug)
    : null;
//cargar los contactos
  useEffect(() => {
    if (!agenda) {
      obtenerContactos(dispatch, slug).finally(() => {
      setLoadingAgenda(false); // Finaliza la carga, independientemente del resultado
      });
    } else {
      setLoadingAgenda(false); // Si ya existe la agenda, no hay carga
    }
  }, [slug, agenda, dispatch]);
  // Función para manejar la edición del contacto
  const handleEdit = (contact) => {
    setEditingContact(contact.id);
    setEditedName(contact.name);
    setEditedPhone(contact.phone);
    setEditedEmail(contact.email);
  };
  // Función para guardar los cambios del contacto editado
  const handleSave = async (id) => {
    const updatedContact = {
      id,
      name: editedName,
      phone: editedPhone,
      email: editedEmail,
    };
    try {
      await actualizarContacto(updatedContact, dispatch, slug); // Pasa el slug aquí
      setEditingContact(null); // Salir del modo de edición
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
    }
  };
  // Función para eliminar un contacto
  const handleDelete = async (id) => {
    try {
      await eliminarContacto(id, dispatch, slug); // Pasa el slug aquí
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-center">
        <Link to={`/add-contact/${slug}`}><button className="btn btn-primary">Add contact</button></Link>
        <h2 className="mb-4">Agenda de: {slug}</h2>
        {loadingAgenda ? (
          <p>Cargando agenda...</p> // Muestra un mensaje de carga mientras se obtiene la agenda
        ) : agenda ? (
          <div className="card shadow-sm p-4 mb-4">
            <h3 className="mb-3">{agenda.slug}</h3>
            <p className="text-muted">ID: {agenda.id}</p>
            {/* Aquí puedes mostrar más detalles de la agenda */}
          </div>
        ) : (
          <p className="text-muted"></p> // Muestra el mensaje solo si no se encontró la agenda
        )}
        <h3 className="mb-4">Contactos</h3>
        {contacts.length === 0 ? (
          <p className="text-muted">No hay contactos disponibles.</p>
        ) : (
          <ul className="list-unstyled">
            {contacts.map((contact) => (
              <li key={contact.id} className="card shadow-sm p-3 mb-3">
                <div className="d-flex align-items-center">
                  {/* Imagen del contacto en un círculo */}
                  <div
                    className="rounded-circle overflow-hidden me-3"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2016/08/21/08/09/green-1609124_1280.png" // URL de la imagen del contacto
                      alt={contact.name}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {/* Detalles del contacto en el cual si esta activo el boton de editar me muestra formulario edicion si no botones
                  de editar eliminar */}
                  <div className="flex-grow-1">
                    {editingContact === contact.id ? (
                      // Formulario de edición
                      <div>
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Nombre"
                        />
                        <input
                          type="text"
                          value={editedPhone}
                          onChange={(e) => setEditedPhone(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Teléfono"
                        />
                        <input
                          type="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Email"
                        />
                        <button
                          onClick={() => handleSave(contact.id)}
                          className="btn btn-success btn-sm me-2"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingContact(null)}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    )
                    :
                    (
                      // Detalles del contacto(el centro de la tarjeta)
                      <div>
                        <p className="mb-1">
                          <strong>Nombre:</strong> {contact.name}
                        </p>
                        <p className="mb-1">
                          <strong>Teléfono:</strong> {contact.phone}
                        </p>
                        <p className="mb-0">
                          <strong>Email:</strong> {contact.email}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Botones de editar y eliminar */}
                  {editingContact !== contact.id && (
                    <div className="bg-warning">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Contactos;