import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [characters, setCharacters] = useState();

  useEffect(() => {
    getFetchData();
  }, []);


  const getFetchData = async () => {
    try {
      const respuesta = await fetch(
        "https://dragonball-api.com/api/characters"
      );
      if (!respuesta.ok) {
        throw new Error("Error al obtener los datos");
      }
      const datosApi = await respuesta.json();
      setCharacters(datosApi);
    } catch (err) {
      console.error("Error al obtener los datos:", err);
    }
  };


  console.log(characters);
  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
};