
import ParticipantsApp from './ParticipantsApp';


// const  ParticipantsAppConfig = {
//   settings: {
//     layout: {
//       config: {},
//     },
//   },
//   routes: [
//     {
//       path: 'comercial/Participantesv2',
//       element: <ParticipantsApp />,
//     },
//   ],
// };

// export default ParticipantsAppConfig;

export function ParticipantsAppConfig (item =[]){

  
  const Config ={
    settings: {
      layout: {
        config: {},
      },
    },
    auth: item,
    routes: [
      {
        path: 'comercial/Participantesv2',
        element: <ParticipantsApp />,
      },
    ],
  }
return Config
}

