import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ParticipantesAppHeader from "./ParticipantesAppHeader";
import reducer from "./store";
import StickyHeadTable from "./tabs/StickyHeadTable";
import Instrucciones from "./tabs/instrucciones/Instrucciones";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

const ParticipantesApp = () => {
  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  const [idPart, setidPart] = useState();

  function passToken(tokens) {
    setidPart(tokens);
  }
 
  return (
    <Root
      // header={<ParticipantesAppHeader passToken={passToken} />}
      content={<StickyHeadTable />}
      // content={
      //   <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
      //     <Tabs
      //       value={tabValue}
      //       onChange={handleChangeTab}
      //       indicatorColor="secondary"
      //       textColor="inherit"
      //       variant="scrollable"
      //       scrollButtons={false}
      //       className="w-full px-24 -mx-4 min-h-40"
      //       classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
      //       TabIndicatorProps={{
      //         children: (
      //           <Box
      //             sx={{ bgcolor: 'text.disabled' }}
      //             className="w-full h-full rounded-full opacity-20"
      //           />
      //         ),
      //       }}
      //     >
      //       <Tab
      //         className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
      //         disableRipple
      //         label="Instrucciones"
      //       />
      //       <Tab
      //         className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
      //         disableRipple
      //         label="Cuadre Masivo"
      //       />
      //       <Tab
      //         className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
      //         disableRipple
      //         label="Reportes"
      //       />
      //     </Tabs>
      //     {tabValue === 0 && <Instrucciones id={idPart} />}
      //     {tabValue === 1 && '<BudgetTab />'}
      //     {tabValue === 2 && '<TeamTab />'}
      //   </div>
      // }
      // scroll="content"
    />
  );
};

export default withReducer("ParticipantesApp", reducer)(ParticipantesApp);
