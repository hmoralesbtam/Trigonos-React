
import FacturacionMasivaApp from './FacturacionMasivaApp';


// const  FacturacionMasivaAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   routes: [
//     {
//       path: 'comercial/FacturacionMasiva',
//       element: <FacturacionMasivaApp />,
//     },
//   ],
// };

export default FacturacionMasivaAppConfig;

export function FacturacionMasivaAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: 'comercial/FacturacionMasiva',
        element: <FacturacionMasivaApp />,
      },
    ],
  }
return Config
}
