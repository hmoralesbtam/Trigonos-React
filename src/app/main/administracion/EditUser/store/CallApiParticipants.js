import react from "react";
import axios from "axios";

export const CallApiParticipants = async (idUser) => {
  let url = "";
  url = `https://trigonosapi.azurewebsites.net/api/Participantes?id=${idUser}`;
  const response = await axios.get(url);
  const dataResponse = await response.data;
  return dataResponse;
};
