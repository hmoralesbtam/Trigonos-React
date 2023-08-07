import { useGetEstadoFacturacionQuery, useGetEstadoPagoQuery, useGetEstadoRecepcionadoQuery } from "app/store/metricsApi/metricsApi";
import GraficoTorta from "./GraficoTorta";
import { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import LinearProgress from "@mui/material/LinearProgress";

export default function Estadisticas(props){
    const { participantId,reLoad } = props
    const { data: getDataPago, isFetching: fetching, refetch: refetchEstPago} = useGetEstadoPagoQuery(participantId);
    const { data: getDataRecep, isFetching: fetchingRecepcionado, refetch: refetchEstRecep } = useGetEstadoRecepcionadoQuery(participantId);
    const { data: getDataFact, isFetching: fetchingFacturado, refetch : refetchEstFact} = useGetEstadoFacturacionQuery(participantId);
    const [carga, setCarga] = useState(true)
    useEffect(() => {
 
        function verificacarga() {
          if ([fetchingRecepcionado,fetching,fetchingFacturado].every((valor) => valor === false)) {
            return false;
          } else {
            return true;     
          }
        }
      setCarga(verificacarga() )
  
    }, [fetchingRecepcionado,fetching,fetchingFacturado])
    useEffect(() => {
      refetchEstPago()
      refetchEstRecep()
      refetchEstFact()
    }, [participantId,reLoad])
    return (
        <div>
            {carga ?<div className="flex items-center">
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  
                  <LinearProgress color="primary" />
                </Stack>
              </div>:
            <GraficoTorta 
                dataEstPago={getDataPago} 
                dataEstRecept={getDataRecep} 
                dataEstFact={getDataFact} 
                idpart = {participantId} />
            }
            
        </div>

    );
}