import {
  Box,
  Divider,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Tabs,
  Typography,
} from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HiOutlineInformationCircle, HiOutlineUser } from "react-icons/hi";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import SearchIcon from "@mui/icons-material/Search";
import { callParticipants } from "../store/callParticipants";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReportIcon from "@mui/icons-material/Report";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let participants;
export default function SelectClientTable(props) {
  const [cliente, setcliente] = useState("");
  const [render, setRender] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [participants, setParticipants] = useState([]);
  const [payrollTable, setPayrollTable] = useState(0);
  const [alertt, setAlertt] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setParticipants(props.dataParticipant);
  }, []);
  useEffect(() => {
    if (alertt === true) {
      setOpen(true);
      setTimeout(() => {
        setAlertt(false);
        setOpen(false);
      }, 1500);
    }
  }, [alertt]);
  const handleChange = (event) => {
    setcliente(event.target.value);

    props.actualizarEstado(event.target.value);
    setValue(dayjs());
  };
  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };
  const searchPayroll = () => {
    render == true ? setRender(true) : setRender(false);
    let prueba = participants.find((p) => p.id == cliente);
    if (prueba != undefined) {
      props.sendClientData(prueba);
      props.changeDisc(searchPayroll);
    } else {
      setAlertt(true);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "100%",
          minHeight: 300,
        },
      }}
    >
      <Paper variant="outlined">
        <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] ">
          <HiOutlineUser className="w-[30px] h-[30px]  mr-[10px] " />
          <b>
            {" "}
            <span className="text-[16px]"> Seleccionar Cliente</span>
          </b>
        </div>
        <div className="flex justify-center  p-[10px] text-center border-2 border-pantonerojo bg-grey-100 align-middle  smmax:space-x-[3px] sm:space-x-[10px]">
          <HiOutlineInformationCircle className="w-[30px] h-[30px] text-red-300" />
          <span>
            Es necesario seleccionar <b>Cliente</b> y <b>Fecha</b> para la
            Descarga
          </span>
        </div>
        <div className="flex  w-full items-center justify-evenly mt-[10px]   ">
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Seleccionar Cliente
            </InputLabel>

            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cliente}
              onChange={handleChange}
              autoWidth
              label="Seleccionar Cliente"
            >
              {/* AQUI SE RECORREN LOS CLIENTES */}
              {participants.map(({ business_Name, id }) => (
                <MenuItem key={id} value={id}>
                  {business_Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="flex  w-full items-center justify-evenly   ">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ m: 1, minWidth: 350 }}
          >
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Seleccione Fecha"
                inputFormat="DD/MM/YYYY"
                disablePast={true}
                value={value}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="flex  w-full items-center justify-evenly m-[10px]  ">
          <Button
            className="w-[150px]"
            variant="contained"
            color="primary"
            onClick={searchPayroll}
            startIcon={<SearchIcon />}
            style={{
              m: 1,
              width: 250,
              margin: "0 auto",
              display: "flex",

              color: "white",
            }}
          >
            Buscar
          </Button>
        </div>
      </Paper>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#FF5733" }}>
          {"Error"}
          <ReportIcon sx={{ color: "#FF5733" }} />
        </DialogTitle>
        <DialogContent>
          <h2 className="text-pantoneazul">Debe seleccionar un Cliente</h2>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
