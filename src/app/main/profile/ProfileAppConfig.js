

import { lazy } from "react";

const ProfileApp = lazy(() => import("./ProfileApp"));



export function ProfileAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth:item ,
    routes: [
      {
        path: 'ProfileApp',
        element: <ProfileApp />,
      },
    ],
  }
return Config
}

// const  ProfileAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   routes: [
//     {
//       path: 'ProfileApp',
//       element: <ProfileApp />,
//     },
//   ],
// };




