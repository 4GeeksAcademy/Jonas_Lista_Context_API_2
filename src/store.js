export const initialStore=()=>{ // Almacena las variables
  return{
    message: null,
    agendas: [],

  }
}

export default function storeReducer(store, action = {}) { // acciones que modifican las variables
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'GET_AGENDAS': // nombre de la acción
      return{
        ...store,
        agendas: action.payload, // guarda en agendas lo que trae del payload 
      }  

    default:
      throw Error('Unknown action.');
  }    
}
