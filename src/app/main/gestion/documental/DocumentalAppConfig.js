
import { lazy } from "react";


const DocumentalApp = lazy(() => import("./DocumentalApp"));

export function DocumentalAppConfig (item =[]){
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth:item,
    routes: [
      {
        path: "gestion/documental",
        element: <DocumentalApp />,
      },
    ],
  }
return Config
}
