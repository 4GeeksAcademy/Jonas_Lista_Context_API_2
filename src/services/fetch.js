const Api_Url_Base = "https://playground.4geeks.com/contact"

export const obtenerAgendas = async (dispatch) => {
    try {
        const response = await fetch("https://playground.4geeks.com/contact/agendas");
        const data = await response.json();
        dispatch({ type: "GET_AGENDAS", payload: data }); 
        // dispatch es una orden para que se ejecute una función
        // type es el nombre de la orden que quiero ejecutar, que se encuentra en un de los casos del Reducer
        // payload es la carga útil que me devuelve el fetch

    } catch (error) {
        console.error("Error al obtener agendas:", error);
    }
}