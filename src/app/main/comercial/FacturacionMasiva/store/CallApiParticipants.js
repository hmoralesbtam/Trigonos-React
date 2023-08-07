import React from "react";
import axios from "axios";
export const CallApiParticipants = async (
  PageIndex = 1,
  PageSize = 10,
  numero = 1
) => {
  const idUser = localStorage.getItem("idUser");
  let url = `https://trigonosapi.azurewebsites.net/api/Participantes?id=${idUser}`;
  let response;
  let prueba;

  response = await axios.get(url);
  prueba = await response.data;

  return prueba;
};
// const idUser = localStorage.getItem("idUser");

// const response = await axios.get(
//   ` https://trigonosapi.azurewebsites.net/api/Participantes?id=${idUser}`
// );
