import react from "react";
import axios from "axios";
let apiResponse = [];
export const CallApiProyects = async () => {
  let url = "";
  url = `https://trigonosapi.azurewebsites.net/api/Proyectos/`;
  await axios
    .get(url)
    .then((res) => {
      apiResponse = res.data;
    })
    .catch(({ code }) => {
      prueba = code;
    });
  return apiResponse;
};
