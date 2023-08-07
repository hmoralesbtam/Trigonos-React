import { useEffect } from "react";
import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";

import Error404Page from "../main/404/Error404Page";

function routesConfigDinamic({ data }) {
  const routeConfigs = [
    // ExampleConfig,
    // SignOutConfig,
    // SignInConfig,
    // SignUpConfig,
    // RecoverPassConfig,
    // RecoverPassTwoConfig,
    // ...ComercialConfigs,
    // ...AnalisisConfig,
    // ...AdministracionConfig,
    // ProfileAppConfig,
  ];

  const routes = [
    ...FuseUtils.generateRoutesFromConfigs(
      routeConfigs,
      settingsConfig.defaultAuth
    ),
    {
      path: "/",
      element: <Navigate to="/comercial/estadoFacturacionV2" />,
      auth: settingsConfig.defaultAuth,
    },
    {
      path: "loading",
      element: <FuseLoading />,
    },
    {
      path: "404",
      element: <Error404Page />,
    },
    {
      path: "*",
      element: <Navigate to="404" />,
    },
  ];
  return {
    routes: routes,
  };
}

// const routesConfigDinamic = (Component ) => (props) => {

//     // let person = props.uwu;

//     const Prueba = () =>{

//     }

//     return Prueba;
//   };

//   export default routesConfigDinamic;
