import axios from "axios";
import { useEffect } from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";
// useEffect(() => {
//   console.log("aqui");
// });
// export function prueba (){
//   const { isloading, role } = useSelector((state) => state.fuse.roleSlice);
//   console.log(role)
// }


const EditUserApp = lazy(() => import("./EditUserApp"));
// let array = [];




export function EditUserAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth:item,
      // window.localStorage.getItem("pagina") == "Facturacion"
      //   ? ["Administrador"]
      //   : ["Nada"],
    routes: [
      {
        path: "administracion/EditUserApp",
        element: <EditUserApp />,
      },
    ],
  }
return Config
}
