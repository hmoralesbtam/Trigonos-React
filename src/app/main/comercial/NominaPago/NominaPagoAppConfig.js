
import NominaPagoApp from './NominaPagoApp';


// const  NominaPagoAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
  
//   routes: [
//     {
//       path: 'comercial/nominaPago',
//       element: <NominaPagoApp />,
//     },
//   ],
// };

// export default NominaPagoAppConfig;

export function NominaPagoAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: 'comercial/nominaPago',
        element: <NominaPagoApp />,
      },
    ],
  }
return Config
}


