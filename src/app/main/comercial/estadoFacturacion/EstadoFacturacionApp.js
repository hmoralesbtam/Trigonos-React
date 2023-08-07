import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState, memo } from "react";
import EstadoFacturacionAppHeader from "./EstadoFacturacionAppHeader";
import Button from "@mui/material/Button";
import reducer from "./store";
import Instrucciones from "./tabs/instrucciones/Instrucciones";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
let clearStates;
let clearFilters;
const EstadoFacturacionApp = () => {
  const [tabValue, setTabValue] = useState(0);
  const [idPart, setidPart] = useState();

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function passToken(tokens) {
    setidPart(tokens);
  }
  function getClearStates(states) {
    clearStates = states;
  }
  function getClearFilters(filters) {
    clearFilters = filters;
  }
  return (
    <Root
      header={
        <EstadoFacturacionAppHeader
          passToken={passToken}
          clearStates={clearStates}
          clearFilters={clearFilters}
        />
      }
      content={
        <div className="w-full p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
          {/* <Button
            onClick={() => {
              clearStates();
            }}>
            asdasd
          </Button> */}
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
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Cuadre Masivo"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Reportes"
            />
          </Tabs>
          {tabValue === 0 && (
            <Instrucciones
              id={idPart}
              getClearStates={getClearStates}
              getClearFilters={getClearFilters}
            />
          )}
          {tabValue === 1 && "<BudgetTab />"}
          {tabValue === 2 && "<TeamTab />"}
        </div>
      }
      scroll="content"
    />
  );
};

export default withReducer(
  "estadoFacturacionApp",
  reducer
)(EstadoFacturacionApp);
