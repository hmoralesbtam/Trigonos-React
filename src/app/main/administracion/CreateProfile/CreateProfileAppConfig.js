import { lazy } from "react";
import { authRoles } from "src/app/auth";
import { useDispatch, useSelector } from "react-redux";
import roleSlice from "app/store/Role/roleSlice";

// import AcuseteApp from "./AcuseteApp";
const CreateProfileApp = lazy(() => import("./CreateProfileApp"));




//  const CreateProfileAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   auth: authRoles.admin,
//   routes: [
//     {
//       path: "administracion/CreateProfile",
//       element: <CreateProfileApp />,
//     },
//   ],
// };





export function CreateProfileAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: "administracion/CreateProfile",
        element: <CreateProfileApp />,
      },
    ],
  }
return Config
}



