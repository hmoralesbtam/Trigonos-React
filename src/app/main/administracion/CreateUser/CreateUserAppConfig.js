import { lazy } from "react";
import { authRoles } from "src/app/auth";
// import AcuseteApp from "./AcuseteApp";
const CreateUserApp = lazy(() => import("./CreateUserApp"));

// const CreateUserAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   auth: authRoles.admin,
//   routes: [
//     {
//       path: "administracion/CreateUser",
//       element: <CreateUserApp />,
//     },
//   ],
// };

// export default CreateUserAppConfig;



export function CreateUserAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth:item ,
    routes: [
      {
        path: "administracion/CreateUser",
        element: <CreateUserApp />,
      },
    ],
  }
return Config
}
