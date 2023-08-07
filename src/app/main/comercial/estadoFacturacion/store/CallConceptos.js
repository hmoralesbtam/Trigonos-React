import react from "react";
import axios from "axios";

export const CallConceptos = async () => {
  let url = "";
  url = " https://trigonosapi.azurewebsites.net/glosa";
  const response = await axios.get(url);
  const dataResponse = await response.data;
  const dataResponseNew = [...dataResponse, { label: "" }];
  return dataResponseNew;
};
