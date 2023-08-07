import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LinearProgress from "@mui/material/LinearProgress";

import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Tab, Tabs } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { useState } from "react";

import {  useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import {
  useGetParticipantesById_Query,
} from "app/store/participantesApi/participantesApi";
import { useEffect } from "react";
import Instrucciones from "./widgets/tabs/Instrucciones";


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

function estadoFacturacion(props) {
  const [carga, setCarga] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector(selectUser);
 
  const [open, setOpen] = useState(false);
  const { data: getData, isFetching: fetchListParticipant } = useGetParticipantesById_Query(
    user.idUser
  );
  const [client, setClient] = useState(); //recuerda hacer el ternario client!=null?client.id:0 a los que necesiten la wea

  // useEffect(() => {
  //   if (getData != undefined) {
    
  //   }
  // }, [fetchListParticipant]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    function verificacarga() {
      if (
        [fetchListParticipant].every(
          (valor) => valor === false
        )
      ) {
        return false;
      } else {
        return true;
      }
    }
   if (getData != undefined) {
      setClient(getData.data[0]);

    }
    setCarga(verificacarga());

  }, [fetchListParticipant]);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleclose() {
    setOpen(false);
    setAnchorEl(null);
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
              anchorEl={anchorEl}
              open={open}
              onClose={handleclose}
            >
              {getData.data &&
                getData.data.map((cliente) => (
                  <MenuItem
                    key={cliente.id}
                    onClick={(ev) => {
                  
                      setClient(cliente);
                      handleclose();
                    }}
                  >
                    {cliente.business_Name || getData.data[0].business_Name}
                  </MenuItem>
                ))}
            </Menu>
          </div>
          {/* <Autocomplete
            id="size-small-filled"
            size="small"
            className="w-1/4 pl-[20px] pt-[10px]"
            disablePortal
            options={getData.data}
            value={client || getData.data[0]}
            onChange={(event, newValue) =>
              newValue != undefined && setClient(newValue)
            }
            getOptionLabel={(option) => option.business_Name}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Clientes" />
            )}
          /> */}
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
              label="Instrucciones"
            />
       
          </Tabs>
          {tabValue === 0 && client!=undefined&& (
           
            <Instrucciones id ={client.id} participants ={getData.data}
            
            />
          )}
          
        </div>
      }
      scroll="content"
    />
  );
}
export default estadoFacturacion;
