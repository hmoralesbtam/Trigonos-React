import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FacturacionMasivaAppHeader from "./ParticipantsAppHeader";
import VerticalStepper from "./tabs/VerticalStepper";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import FiltrosParticipant from "./tabs/FiltrosParticipant";

import { CallApi } from "./store/CallApi";
import { useEffect, useState } from "react";
import { useGetNumberFactCLMutation, useGetNumberParticipantMutation, useGetNumberParticipantQuery, useGetNumberProyectoMutation, useGetPartAllMutation,useGetProyAllMutation } from "app/store/participantesApi/participantesApi";
import { useGetFactCLAllMutation, useGetFactCLAllQuery } from "app/store/facturacionClApi/facturacionClApi";
import { useGetFacturadorERPTableQuery, useGetNominaPagoTableQuery } from "app/store/nominasApi/nominasApi";
import Autocomplete from "@mui/material/Autocomplete";
import AdviceModule from "../AdviceModule";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { FastForward } from "@mui/icons-material";
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
let participants = [];
const NominaPagoApp = () => {
  const [isloading, setIsloading] = useState(true);
  const [carga, setCarga] = useState(true);
  const {data: getFactErp, isFetching: fetchFactErp }= useGetFacturadorERPTableQuery();
  const {data: getNomPago, isFetching: fetchNomPag }= useGetNominaPagoTableQuery();
  const [id, setId] = useState(undefined);
  const [fullData, setFullData] = useState([{}]);
  // allparticipants={getParticipant.data}
  // allprojects={getProject.data}
  // allfactcl={getFactCl}
  // sendFullData={getFullData}
  // change={carga}
  // idParticipant={datapermanet}
  
  //OBTENER CANTIDAD PARA ITERAR
  const [getNumParticipant, {isLoading : isLoadingNParticipant}] = useGetNumberParticipantMutation();
  const [getNumProyecto, {isLoading : isLoadingNProyecto}] = useGetNumberProyectoMutation();
  const [getNumFactCl, {isLoading : isLoadingNFactCl}] = useGetNumberFactCLMutation();

  //MUTATIONS QUE DEBEN SER ITERADOS
  const [getPartMutation, {isLoading : isLoadingPartm}] = useGetPartAllMutation();
  const [getProyectoMutation, {isLoading : isLoadingProyectom}] = useGetProyAllMutation();
  const [getFactClMutation, {isLoading : isLoadingFactClm}] = useGetFactCLAllMutation();

  //VARIABLES QUE RECIBEN LOS DATOS EN LA ITERACIÓN
  const [participantes, setParticipantes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [facturacionCl, setFacturacionCl] = useState([]);

  //VARIABLES BOOL PARA VERIFICAR CARGA
  const [cargaParticipant, setCargaParticipant] = useState(true);
  const [cargaProyectos, setCargaProyectos] = useState(true);
  const [cargafacturacionCl, setCargafacturacionCl] = useState(true);

  function GetDataMutations(){
    
    try {
      setParticipantes([]);
      setProyectos([]);
      setFacturacionCl([]);
      
      setIsloading(true);
      setCargaParticipant(true);
      setCargaProyectos(true);
      setCargafacturacionCl(true);
      let specParticipant = {
        PageIndex: 1,
        PageSize: 200,
    
      };
      let specProyectos = {
        PageIndex: 1,
        PageSize: 200,
    
      };
      let specFacturacionCl = {
        PageIndex: 1,
        PageSize: 200,
    
      };
      getNumParticipant(specParticipant)
      .then((response) => {
        const buclesF = Math.round(response.data / 200 + 0.49) + 1;
        const requests = Array.from({ length: buclesF - 1 }, (_, index) => {
          specParticipant.PageIndex = index + 1;
          return getPartMutation(specParticipant);
        });
       
        Promise.all(requests)
          .then((responses) => {
            const newData = responses.map((response) => response.data.data).flat();
            setParticipantes((prevLista) => {
              if (Array.isArray(prevLista)) {
                return [...prevLista, ...newData];
              } else {
                return [...newData];
              }
            });
            setCargaParticipant(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
      getNumProyecto(specProyectos)
      .then((response) => {
        const buclesF = Math.round(response.data / 200 + 0.49) + 1;
        const requests = Array.from({ length: buclesF - 1 }, (_, index) => {
          specProyectos.PageIndex = index + 1;
          return getProyectoMutation(specProyectos);
        });
       
        Promise.all(requests)
          .then((responses) => {
            const newData = responses.map((response) => response.data.data).flat();
            setProyectos((prevLista) => {
              if (Array.isArray(prevLista)) {
                return [...prevLista, ...newData];
              } else {
                return [...newData];
              }
            });
            setCargaProyectos(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

      getNumFactCl(specFacturacionCl)
      .then((response) => {
        const buclesF = Math.round(response.data / 200 + 0.49) + 1;
        const requests = Array.from({ length: buclesF  }, (_, index) => {
          specFacturacionCl.PageIndex = index + 1;
          return getFactClMutation(specFacturacionCl);
        });
        console.log("facturacion", specFacturacionCl)
        Promise.all(requests)
          .then((responses) => {
            const newData = responses.map((response) => response.data.data).flat();
            setFacturacionCl((prevLista) => {
              if (Array.isArray(prevLista)) {
                return [...prevLista, ...newData];
              } else {
                return [...newData];
              }
            });
            setCargafacturacionCl(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.log("ERROR LOGICA NUMBERS Y PARTICIPANTES");
    }
  }

  let ArrayFetchs = [fetchFactErp,fetchNomPag];
    let ArrayDatas = [getFactErp,getNomPago];
    function verificarLista() {
      if (ArrayFetchs.every((valor) => valor === true)) {
        return true;
      } else {
        if(ArrayDatas.every((valor) => valor != undefined)){
          return false;
        }else{
          
          return true;
          
        }
        
      }
    }
  

  useEffect(() => {
 
      function verificacarga() {
        if ([fetchFactErp,fetchNomPag,cargaParticipant,cargaProyectos,cargafacturacionCl].every((valor) => valor === false)) {
          return false;
        } else {
          return true;
  
          
        }
      }
    

    if(verificacarga()===false){
   
      if(!cargaParticipant && !cargaProyectos && !cargafacturacionCl){
        setIsloading(false);
        if(id){
          setFullData({
            dataParticipant: participantes.filter((data) => data.id ===id)[0]||{},
            dataProject:proyectos.filter((data) => data.id_participants ===id)[0]||{},
            dataFactCl:facturacionCl.filter((data) => data.idParticipante ===id)[0]||{}
    
          });
        }else{
          setFullData({
            dataParticipant: participantes[0],
            dataProject:proyectos.filter((data) => data.id_participants ===participantes[0].id)[0]||{},
            dataFactCl:facturacionCl.filter((data) => data.idParticipante ===participantes[0].id)[0]||{}
    
          });
          setId(participantes[0].id)
        }
        
      }
    }
  
  

  }, [fetchFactErp,fetchNomPag,cargaParticipant,cargaProyectos,cargafacturacionCl])


  useEffect(() => {
    GetDataMutations()
  }, [])
  useEffect(() => {
    console.log(fullData);
  }, [fullData])
  

  
  
 

  const [change, setChange] = useState(false);
  const [idParticipant, setIdParticipant] = useState();

  const getIdParticipant = (data) => {
    
    setIdParticipant(data);
  };

  const getChange = (data) => {
    
    
    setChange(data);
  };


 
  return (
    <Root
      // header={<FacturacionMasivaAppHeader />}
      content={
        <Box className="flex flex-col w-full  p-[20px]">
          <Box className="  bg-white rounded-sm p-[10px] mb-[20px]">
            <h1 className="ml-[5px]">Participantes</h1>
            <h1 className="border border-b-pantoneazul"></h1>
            <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
              <div>
                <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
              </div>
              <div>
                <span className="text-grey-700">
                  Introducir términos de búsqueda en los <b>filtros</b>{" "}
                  superiores para encontrar al <b>cliente</b> que requiera{" "}
                  gestionar su información, luego en la parte inferior se
                  cargaran los datos asociados.
             
                </span>
              </div>
            </Box>
          </Box>
          {isloading?<Paper className="w-full p-[20px] mb-[20px]">
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  
                    <LinearProgress color="primary" />
            </Stack>
         </Paper>:

         <>
         <Paper className="w-full p-[20px] mb-[20px]">
      {/*   
         <FiltrosParticipant
           allparticipants={getParticipant.data}
           allprojects={getProject.data}
           allfactcl={getFactCl}
           sendFullData={getFullData}
           change={carga}
           idParticipant={datapermanet}
          //  isLoading={getIsloading}
         
         /> */}
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
            options={participantes}
            value={fullData.dataParticipant}
            onChange={(event, newValue) =>
              {newValue != undefined && 
              setFullData( {
                dataParticipant: newValue,
                dataProject:proyectos.filter((data) => data.id_participants ===newValue.id)[0]||{},
                dataFactCl:facturacionCl.filter((data) => data.idParticipante ===newValue.id)[0]||{}
              
              }); newValue != undefined && setId(newValue.id);}
            }
            getOptionLabel={(option) =>
              option.business_Name 
            }
           
            id="combo-box-demo"
            renderInput={(params) => (
              <TextField {...params} key={params.business_Name} label="Razón Social" />
            )}
          />
          <Autocomplete
            className="m-[10px] w-[300px] md:w-[500px]"
            disablePortal
            onChange={(event, newValue) =>
              {newValue != undefined && 
                setFullData( {
                  dataParticipant: newValue,
                  dataProject:proyectos.filter((data) => data.id_participants ===newValue.id)[0]||{},
                  dataFactCl:facturacionCl.filter((data) => data.idParticipante ===newValue.id)[0]||{}
                
                }); newValue != undefined && setId(newValue.id);}
            }
          
            getOptionLabel={(option) =>
              option.rutCompleto 
          
            }
            id="combo-box-demo_dos"
            options={participantes}
            value={fullData.dataParticipant}
            renderInput={(params) => <TextField {...params}  key={params.rutCompleto}  label="Rut" />}
          />
        </Box>
       </Paper>
        {isloading?  <Paper className="w-full p-[20px] mb-[20px]">
       <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
             
               <LinearProgress color="primary" />
       </Stack>
       </Paper>:
          <Paper className="w-full p-[20px] ">
         <VerticalStepper
           fullData={fullData}
           nominaPago={getNomPago}
           facturadorErp={getFactErp}
           sendChange={getChange}
           sendIdParticipant={getIdParticipant}
           sendIdAndLoad={GetDataMutations}
          //  isLoading ={isloading}
         />
       </Paper>
       }</>} 
        </Box>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;
