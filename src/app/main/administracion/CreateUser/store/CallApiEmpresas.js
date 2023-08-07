import React from "react";
import axios from "axios";
export const CallApiEmpresas = async () => {
  let url = " https://trigonosapi.azurewebsites.net/api/Empresas";
  let response = await axios.get(url);

  let data = await response.data;

  return data;
};
