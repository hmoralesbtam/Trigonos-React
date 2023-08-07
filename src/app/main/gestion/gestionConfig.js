import { DocumentalAppConfig } from "./documental/DocumentalAppConfig";

export function gestionConfig (data =[]){

    function getListRoles(idPagina){
      return (data.filter(
        (item) => item.idpagina=== idPagina
      )).map(function(el) {
        return el.nombreRol         
      });
    }
    const ConfigCollection =[
        DocumentalAppConfig(getListRoles(13)),
     
    ]
     
  return ConfigCollection
  }