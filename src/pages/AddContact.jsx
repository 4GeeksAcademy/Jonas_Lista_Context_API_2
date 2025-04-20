import React, { useState } from "react";
import { crearContacto, actualizarContacto } from "../services/fetch.js";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";
function AddContact({ contactToEdit }) {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { slug } = useParams(); // Obtén el slug de la URL
  const [contact, setContact] = useState(
    contactToEdit || {
      name: "",
      phone: "",
      email: "",
      address: "",
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactToEdit) {
      await actualizarContacto(contact, dispatch, slug); // Pasa el slug aquí
    } else {
      await crearContacto(contact, dispatch, slug); // Pasa el slug aquí
    }
    navigate(`/contactos/${slug}`); // Redirige a la lista de contactos de la agenda
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="add-contact-title text-center mb-4">
            {contactToEdit ? "Editar Contacto" : "Agregar Contacto"}
          </h1>
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nombre"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Teléfono"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Dirección"
                value={contact.address}
                onChange={(e) =>
                  setContact({ ...contact, address: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-add w-100">
              {contactToEdit ? "Actualizar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddContact;