
import { lazy } from "react";


const EstadoFacturacionApp = lazy(() => import("./EstadoFacturacionApp"));

export function EstadoFacturacionAppConfigV2 (item =[]){
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth:item,
    routes: [
      {
        path: "comercial/estadoFacturacionV2/",
        element: <EstadoFacturacionApp />,
      },
    ],
  }
return Config
}
