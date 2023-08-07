import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DemoContent from "@fuse/core/DemoContent";
// import AcuseteApp from "./AcuseteApp";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import GraficosAcusete from "./tabs/GraficosAcusete";
import { CallApiProyects } from "./store/CallApiProyects";
import { CallApiData } from "./store/CallApiData";
// let apiResponse = [];
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
let apiData;
function ExamplePage(props) {
  const { t } = useTranslation("examplePage");
  const [cliente, setCliente] = useState("");
  const [apiResponseProyects, setApiResponseProyects] = useState([]);
  const [proyecto, setProyecto] = useState("Chimbarongo");
  const [render, setRender] = useState(false);
  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };
  const handleChangeProyecto = (event) => {
    setProyecto(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      let prueba;
      // eslint-disable-next-line prefer-const
      prueba = await CallApiProyects();
      return prueba;
    };
    fetchData().then((value) => {
      setApiResponseProyects(value);
    });
  }, [proyecto]);

  return (
    <Root
      header={
        <div className="p-24">
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cliente}
                label="Cliente"
                onChange={handleChangeCliente}>
                <MenuItem value={10}>Toesca</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Proyectos</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={proyecto}
                label="Proyectos"
                onChange={handleChangeProyecto}>
                {apiResponseProyects.map(({ id, nombre }) => (
                  <MenuItem key={id} value={nombre}>
                    {nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      }
      content={
        <div className="p-24">
          <GraficosAcusete nombreProyecto={proyecto} />
          <br />
        </div>
      }
      scroll="content"
    />
  );
}

export default ExamplePage;
