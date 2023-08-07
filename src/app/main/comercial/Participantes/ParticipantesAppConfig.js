import { lazy } from 'react';

const ParticipantesApp = lazy(() => import('./ParticipantesApp'));

// const ParticipantesAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   routes: [
//     {
//       path: 'comercial/Participantes',
//       element: <ParticipantesApp />,
//     },
//   ],
// };

// export default ParticipantesAppConfig;

export function ParticipantesAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: 'comercial/Participantes',
        element: <ParticipantesApp />,
      },
    ],
  }
return Config
}

