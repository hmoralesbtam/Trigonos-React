import react from "react";
import axios from "axios";

export const CallRut = async () => {
  let url = "";
  url = " https://trigonosapi.azurewebsites.net/rut";
  const response = await axios.get(url);
  const dataResponse = await response.data;
  return dataResponse;
};
