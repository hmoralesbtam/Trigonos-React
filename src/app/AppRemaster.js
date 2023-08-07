import React, { createContext, useEffect, useState, useContext } from "react";
import App from "./App";
// Crear el contexto
export const AppContextRoutes = createContext();

// Componente que contiene el Provider
const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Función asincrónica para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContextRoutes.Provider value={data}>
      {children}
    </AppContextRoutes.Provider>
  );
};

// Uso del contexto en un componente hijo directo del Provider
const ChildComponent = () => {
  const data = useContext(AppContextRoutes);

  // Renderizar el componente utilizando los datos del contexto
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

// En el componente raíz de la aplicación, envolver los componentes con el Provider
const AppRemaster = () => {
  const data = useContext(AppContextRoutes);
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};
export default AppRemaster;
