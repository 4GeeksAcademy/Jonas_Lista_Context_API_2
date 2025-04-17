export const initialStore = () => {
  return {
    message: null,
    contador: 0,
    contacts: [], // Agregamos contactos
    agendas: [], // Agregamos agendas
  };
};
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "mensaje":
      return {
        ...store,
        message: "Hola prueba", // Actualiza el mensaje
      };
    case "guardar_agendas":
      return {
        ...store,
        agendas: action.payload, // Guarda las agendas en el estado
      };
    case "agregar_agenda": // Nuevo caso para agregar una sola agenda
      return {
        ...store,
        agendas: [...store.agendas.agendas, action.payload], // Agrega la nueva agenda al estado
      };
    case "guardar_contactos":
      return {
        ...store,
        contacts: action.payload, // Guarda los contactos en el estado
      };
    case "agregar_contacto":
      return {
        ...store,
        contacts: [...store.contacts, action.payload], // Agrega un nuevo contacto
      };
    case "actualizar_contacto":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ), // Actualiza un contacto existente
      };
    case "eliminar_contacto":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    default:
      throw new Error("Unknown action.");
  }
}











