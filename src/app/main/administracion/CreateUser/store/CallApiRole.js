import React from "react";
import axios from "axios";
export const CallApiRole = async () => {
  let url = " https://trigonosapi.azurewebsites.net/api/Rol";
  let response = await axios.get(url);

  let data = await response.data;

  // console.log(data);
  return data;
};
