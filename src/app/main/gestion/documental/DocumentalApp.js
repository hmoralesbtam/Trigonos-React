import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LinearProgress from "@mui/material/LinearProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Tab, Tabs } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { useState } from "react";
import { useGetParticipantesByIdMutation } from "app/store/participantesApi/participantesApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import {
  useGetParticipantesById_Query,
  useGetExcelById_Query,
} from "app/store/participantesApi/participantesApi";
import { useEffect } from "react";
import Acreedor from "./tabs/Acreedor";
import Deudor from "./tabs/Deudor";
import Facturacion from "./tabs/Facturacion";
import NominaPago from "./tabs/NominaPago";
import {
  useGetAcreedorDocumentQuery,
  useGetDeudorDocumentQuery,
} from "app/store/instrucciones/instruccionesApi";

let theme = createTheme(esES);

theme = responsiveFontSizes(theme);
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));
let array = [];
function DocumentalApp(props) {
  const user = useSelector(selectUser);
  const [carga, setCarga] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [stateInstuctions, setStateInstuctions] = useState({});
  const [cargando, setCargando] = useState(false);

  const { data: getData, isFetching: fetching } = useGetParticipantesById_Query(
    user.idUser
  );
  // const { data: getDataDeudor, isFetching: fetchDeudorDocument } =
  //   useGetDeudorDocumentQuery(client != null ? client.id : 0);
  // const { data: getDataAcreedor, isFetching: fetchAcreedorDocument } =
  //   useGetAcreedorDocumentQuery(client != null ? client.id : 0);
  const { data: getDataExcels, isFetching: fetchingExcels } =
    useGetExcelById_Query(client != null ? client.id : 0);
  useEffect(() => {
    setStateInstuctions(array);
  }, [cargando]);

  useEffect(() => {
    if (getData != null) {
      setClient(getData.data[0]);
    }
  }, [fetching]);
  useEffect(() => {
    function verificacarga() {
      if (
        [
          fetchingExcels,
          fetching,
          // fetchDeudorDocument,
          // fetchAcreedorDocument,
        ].every((valor) => valor === false)
      ) {
        return false;
      } else {
        return true;
      }
    }

    setCarga(verificacarga());
  }, [
    fetchingExcels,
    fetching,
    //  fetchDeudorDocument,
    //  fetchAcreedorDocument
  ]);
  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  function handleOpen() {
    setOpen(true);
  }
  function handleclose() {
    setOpen(null);
  }
  return carga ? (
    <Paper className="w-full p-[20px] mb-[20px]">
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="primary" />
      </Stack>
    </Paper>
  ) : (
    <Root
      header={
        <div className="flex flex-col w-full px-24 sm:px-32 mt-[10px]">
          <div className="flex items-center">
            <Button
              onClick={handleOpen}
              className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
              variant="default"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                borderColor: (theme) => theme.palette.divider,
              }}
              endIcon={
                <FuseSvgIcon size={20} color="action">
                  heroicons-solid:chevron-down
                </FuseSvgIcon>
              }
            >
              {client.business_Name || getData.data[0].business_Name}
            </Button>

            <Menu
              id="project-menu"
              // anchorEl={open}
              open={open}
              onClose={handleclose}
              ñ
            >
              {getData.data &&
                getData.data.map((cliente) => (
                  <MenuItem
                    key={cliente.id}
                    onClick={() => {
                      setClient(cliente);
                      handleclose();
                    }}
                  >
                    {cliente.business_Name || getData.data[0].business_Name}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>
      }
      content={
        <div className="w-full  sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="w-full px-24 -mx-4 min-h-40"
            classes={{
              indicator: "flex justify-center bg-transparent w-full h-full",
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Acreedor"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Deudor"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Facturación"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Nominas de pago"
            />
          </Tabs>
          {tabValue === 0 && (
            <Acreedor
              //EXCEL HISTORICOS
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
              //DATOS CLIENTE
              cliente={client}
            />
          )}
          {tabValue === 1 && (
            <Deudor
              //EXCEL HISTORICOS
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
              //DATOS CLIENTE
              cliente={client}
            />
          )}
          {tabValue === 2 && (
            <Facturacion
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
              cliente={client}
            />
          )}
          {tabValue === 3 && (
            <NominaPago
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
              cliente={client}
            />
          )}
        </div>
      }
      scroll="content"
    />
  );
}
export default DocumentalApp;
