import { CreateUserAppConfig } from "./CreateUser/CreateUserAppConfig";
import { EditUserAppConfig } from "./EditUser/EditUserAppConfig";

import { CreateProfileAppConfig } from "./CreateProfile/CreateProfileAppConfig";


// const AdministracionConfig = [
//   CreateUserAppConfig,
//   EditUserAppConfig,
//   CreateProfileAppConfig,
// ];
// export default AdministracionConfig;


export function AdministracionConfig (data =[]){

  function getListRoles(idPagina){
    return (data.filter(
      (item) => item.idpagina=== idPagina
    )).map(function(el) {
      return el.nombreRol         
    });
  }
  const ConfigCollection =[
    CreateUserAppConfig(getListRoles(5)),
    EditUserAppConfig(getListRoles(6)),
    CreateProfileAppConfig(getListRoles(7)),
  ]
   
return ConfigCollection
}