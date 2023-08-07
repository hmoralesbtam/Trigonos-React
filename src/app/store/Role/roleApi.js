import axios from "axios";

export const roleApi = axios.create({
  baseURL: "https://trigonosapi.azurewebsites.net/api/Rol",
});
