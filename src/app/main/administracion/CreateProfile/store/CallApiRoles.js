import React from "react";
import axios from "axios";
export const CallApiRoles = async () => {
  let url = " https://trigonosapi.azurewebsites.net/api/Rol";
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};
