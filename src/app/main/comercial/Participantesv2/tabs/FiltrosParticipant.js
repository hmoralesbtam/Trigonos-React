import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import AdviceModule from "../../AdviceModule";
import { useGetParticipantellMutation, useGetProyectoAllMutation, useGetProyectoByIdMutation } from "app/store/participantesApi/participantesApi";

let participants;
export default function FiltrosParticipant(props) {
 
  const [fullData, setFullData] = useState({
    dataParticipant: props.allparticipants[0],
    dataProject:props.allprojects.filter((data) => data.id_participants ===props.allparticipants[0].id)[0]||{},
    dataFactCl:props.allfactcl.filter((data) => data.idParticipante ===props.allparticipants[0].id)[0]||{}
  });
  const [allParticipants, setAllParticipants] = useState(props.allparticipants);
  const [dataParticipant, setDataParticipant] = useState([props.allparticipants[0]]);

  const [allProjects, setAllProjects] = useState(props.allprojects);
  const [dataProject, setDataProject] = useState([props.allprojects.filter((data) => data.id_participants ===props.allparticipants[0].id)||{}]);

  const [allFactsCl, setAllFactsCl] = useState(props.allfactcl);
  // const [dataFactCL, setDataFactCL] = useState([props.allfactcl.filter((data) => data.id_participants ===props.allparticipants[0].id)||{}]);



 
  useEffect(() => {
    console.log(fullData)
    props.sendFullData(fullData);

  }, [fullData]);

  useEffect(() => {
    console.log(props.idParticipant)
    if(props.idParticipant[0] >0){
      console.log(props.allparticipants)
      setFullData({
        dataParticipant: props.allparticipants.filter((data) => data.id ===props.idParticipant[0])[0],
        dataProject:props.allprojects.filter((data) => data.id_participants ===props.idParticipant[0])[0]||{},
        dataFactCl:props.allfactcl.filter((data) => data.idParticipante ===props.idParticipant[0])[0]||{}
      })
    }
   

  }, [props.idParticipant]);
//  useEffect(() => {
//     // props.sendFullData(fullData);

//   }, [props.allparticipants,props.allprojects,props.allfactcl]);
  useEffect(() => {
   
  }, []);
  return (
    <Box>
      <Box className="flex flex-col w-full mb-[20px] ">
        <AdviceModule
          direction={"ltr"}
          textwidth={500}
          msg={
            'Mediante los siguientes listas "Razón Social", "Rut" usted podrá buscar al participante deseado, ya sea desplazandose por la lista o escribiendo directamente en el campo.'
          }
          className={"relative h-32 w-32 "}
          classnamesegund={"absolute h-14 w-14 -right-[230px] -bottom-[5px]"}
          classPopover={"ml-[20px] mr-[100px]"}
        />
        <Typography variant="h6" className="mb-4" color="primary">
          Búsqueda de Participante
        </Typography>
        <span>Introducir términos de búsqueda</span>
      </Box>
          <Box className="flex  w-full   mdmax:flex-wrap justify-evenly   lg:justify-start">
          <Autocomplete
            className="m-[10px] w-[300px] md:w-[500px]"
            disablePortal
            options={allParticipants}
            value={fullData.dataParticipant}
            onChange={(event, newValue) =>
              newValue != undefined && setFullData( {dataParticipant: newValue,
                dataProject:props.allprojects.filter((data) => data.id_participants ===newValue.id)[0]||{},
                dataFactCl:props.allfactcl.filter((data) => data.idParticipante ===newValue.id)[0]||{}})
            }
            getOptionLabel={(option) =>
              option.business_Name || dataParticipant[0].business_Name
            }
           
            id="combo-box-demo"
            renderInput={(params) => (
              <TextField {...params} label="Razón Social" />
            )}
          />
          <Autocomplete
            className="m-[10px] w-[300px] md:w-[500px]"
            disablePortal
            onChange={(event, newValue) =>
              newValue != undefined && setFullData( {dataParticipant: newValue,
                dataProject:props.allprojects.filter((data) => data.id_participants ===newValue.id)[0]||{},
                dataFactCl:props.allfactcl.filter((data) => data.idParticipante ===newValue.id)[0]||{}})
            }
          
            getOptionLabel={(option) =>
              option.rutCompleto || dataParticipant[0].rutCompleto
          
            }
            id="combo-box-demo"
            options={allParticipants}
            value={fullData.dataParticipant}
            renderInput={(params) => <TextField {...params} label="Rut" />}
          />
        </Box>
      
    </Box>
  );
}
