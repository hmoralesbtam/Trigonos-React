import {EstadoFacturacionAppConfig} from './estadoFacturacion/EstadoFacturacionAppConfig';
import { EstadoFacturacionAppConfigV2 } from './estadoFacturacionV2/EstadoFacturacionAppConfigV2';
// import CobranzaConfig from './cobranzas/CobranzasAppConfigs'
import {ParticipantesAppConfig} from './Participantes/ParticipantesAppConfig';
import {ParticipantsAppConfig} from './Participantesv2/ParticipantsAppConfig';
import {NominaPagoAppConfig} from './NominaPago/NominaPagoAppConfig';
import {FacturacionMasivaAppConfig} from './FacturacionMasiva/FacturacionMasivaAppConfig';


// const ComercialConfig = [
//     ParticipantsAppConfig,
//     EstadoFacturacionAppConfig,
//     ParticipantesAppConfig,
//     NominaPagoAppConfig,
//     FacturacionMasivaAppConfig,
// ];

// export default ComercialConfig;



export function ComercialConfigs (data =[]){
  
    function getListRoles(idPagina){
      return (data.filter(
        (item) => item.idpagina=== idPagina
      )).map(function(el) {
        return el.nombreRol         
      });
    }
    const ConfigCollection =[
        ParticipantsAppConfig(getListRoles(8)),
        EstadoFacturacionAppConfig(getListRoles(9)),
        EstadoFacturacionAppConfigV2(getListRoles(9)),
        ParticipantesAppConfig(getListRoles(8)),
        NominaPagoAppConfig(getListRoles(10)),
        FacturacionMasivaAppConfig(getListRoles(11)),
    ]
     
  return ConfigCollection
  }