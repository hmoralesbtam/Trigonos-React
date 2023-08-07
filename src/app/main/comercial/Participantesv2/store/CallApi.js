import React from "react";
import axios from "axios";
export const CallApi = async (PageIndex = 1, PageSize = 10, numero = 1) => {
  let url = "";
  let response;
  let prueba;
  if (numero === 1) {
    url = ` https://trigonosapi.azurewebsites.net/api/Participantes?All=s&PageIndex=${PageIndex}&PageSize=${PageSize}`;
  } else if (numero === 0) {
    url = ` https://trigonosapi.azurewebsites.net/api/Participantes`;
  } else if (numero === 2) {
    url = " https://trigonosapi.azurewebsites.net/api/Banks";
  }

  response = await axios.get(url);
  prueba = await response.data.data;

  return prueba;
};
