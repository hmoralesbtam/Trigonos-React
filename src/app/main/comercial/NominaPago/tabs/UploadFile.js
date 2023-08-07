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
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { HiOutlineInformationCircle,HiOutlineCloudUpload } from  "react-icons/hi";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';



export default function SelectClientTable(){

    const [cliente, setcliente] = React.useState('');

    const handleChange = (event) => {
        setcliente(event.target.value);
      
    };
    const handleChangeDate = (newValue) => {
        
        setValue(newValue);
    };
    const [value, setValue] = React.useState(dayjs());
    
return (
    <Box  sx={{
        display: 'flex',
        '& > :not(style)': {
        m: 1,
        width: '100%',
        height: '100%',
        minHeight: 300,
        },
            }}>
       
    
        <Paper variant="outlined">
            <div className="flex justify-center  bg-pantoneazul  text-white p-[10px] ">
            
            <HiOutlineCloudUpload  className="w-[30px] h-[30px] mr-[10px]" /><b><span className="text-[16px]"> Subir fecha de pago según descarga de Nomina </span></b>

            </div>
            <div className="flex justify-center  p-[10px] text-center border-2 border-pantoneazul bg-grey-100 align-middle smmax:space-x-[3px] sm:space-x-[10px]">
            
            <HiOutlineInformationCircle className="w-[30px] h-[30px] text-red-300  mr-[10px]" /> <span>Se debe seleccionar un <b>Cliente </b> antes de subir la <b>Nomina</b></span>

            </div>
            
            <div  className="flex  w-full items-center justify-evenly   mt-[20px]">
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, minWidth: 350 }}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                        label="Seleccione Fecha"
                        inputFormat="DD/MM/YYYY"
                        disablePast= {true}
                        value={value}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
            </LocalizationProvider>
                
            </div>
            <div  className="flex  w-full items-center justify-evenly m-[10px]  ">
            <Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<FileUploadIcon />}
                 
                  
                  style={{
                    m: 1,
                    width: 250,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,
                    
                    color: "white",
                  }}
                  >
                  Subir Archivo
                </Button>     
            </div>
              
        


        </Paper>
    </Box>
        
);
}
