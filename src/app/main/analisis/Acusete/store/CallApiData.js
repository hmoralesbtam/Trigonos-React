import react from "react";
import axios from "axios";
let apiResponse = [];
export const CallApiData = async (proyecto = "Chimbarongo") => {
  let url = "";
  url = `https://trigonosapi.azurewebsites.net/api/${proyecto}/`;
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
