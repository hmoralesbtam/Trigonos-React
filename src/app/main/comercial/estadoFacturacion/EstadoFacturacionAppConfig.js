import { lazy } from "react";

const EstadoFacturacionApp = lazy(() => import("./EstadoFacturacionApp"));

// const EstadoFacturacionAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   routes: [
//     {
//       path: "comercial/estadoFacturacion",
//       element: <EstadoFacturacionApp />,
//     },
//   ],
// };

// export default EstadoFacturacionAppConfig;
export function EstadoFacturacionAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: "comercial/estadoFacturacion",
        element: <EstadoFacturacionApp />,
      },
    ],
  }
return Config
}
