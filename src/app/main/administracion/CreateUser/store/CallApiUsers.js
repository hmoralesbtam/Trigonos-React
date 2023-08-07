import React from "react";
import axios from "axios";
export const CallApiUsers = async () => {
  let url = " https://trigonosapi.azurewebsites.net/api/Usuarios/pagination";
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};
