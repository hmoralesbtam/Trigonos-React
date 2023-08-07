import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FacturacionMasivaAppHeader from "./FacturacionMasivaAppHeader";
import HorizontalLinearStepper from "./tabs/HorizontalStepper";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import {
  useGetParticipantesByIdMutation,
  useGetParticipantesById_Query,
  useGetParticipantesQuery,
} from "app/store/participantesApi/participantesApi";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

const NominaPagoApp = () => {
  const idUser = localStorage.getItem("idUser");
  const { data: getParticipants, isLoading: loadparticipant } =
    useGetParticipantesById_Query(idUser);

  return (
    <Root
      // header={<FacturacionMasivaAppHeader />}
      content={
        <Box className="flex flex-col w-full  p-[20px]">
          <Box className="  bg-white rounded-sm p-[10px] mb-[20px]">
            <h1 className="ml-[5px]">Facturación Masiva</h1>
            <h1 className="border border-b-pantoneazul"></h1>
            <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
              <div>
                <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
              </div>
              <div>
                <span className="text-grey-700">
                  Primero selecciona un <b>Cliente</b>, segundo revisa sus{" "}
                  <b>Instrucciones</b> y descarga su folio, tercero sube el{" "}
                  <b>Folio</b> y por último finaliza el proceso{" "}
                </span>
              </div>
            </Box>
          </Box>
          {!loadparticipant && (
            <Paper className="w-full p-[20px] ">
              <HorizontalLinearStepper
                dataParticipants={getParticipants.data}
              />
            </Paper>
          )}
        </Box>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;
