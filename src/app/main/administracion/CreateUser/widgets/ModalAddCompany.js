
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BusinessIcon from '@mui/icons-material/Business';
import * as yup from "yup";
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRut } from './useRut';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { green } from '@mui/material/colors';
import { usePostAddEmpresaMutation } from 'app/store/empresaApi/empresaApi';
const schema = yup.object().shape({
    // user: yup.string().required("Debe ingresar su nombre completo"),
    rutEmpresa: yup
      .string()
      .required("Debe ingresar un rut de empresa"),
      nombreEmpresa: yup
      .string()
      .required("Debe ingresar un nombre comercial"),
  });
  const defaultValues = {
    rutEmpresa:"",
    nombreEmpresa: "",
    
    
  };
export default function ModalAddCompany({setActive}) {
  const [open, setOpen] = useState(true);
  const [secondDopen, setSecondDopen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText:"",
    msgError:false,
  });
  const {msgResp,msgText,msgError} = MsgAlert;

  const [rutCompany, setRutCompany] = useState("");
  const [nameCompany, setNameCompany] = useState("");
  const [postAddEmpresa, data_] = usePostAddEmpresaMutation();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
 
  const handleClickOpen = () => {
    setSecondDopen(true);
  
  };
  const handleCloseAlert = () => {
    setSecondDopen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setActive();
  };
  const handleChangeRut = event => {
   
    setRutCompany(event.target.value);
  };
  const handleChangeName = event => {
    setNameCompany(event.target.value);
  };

  
  function onSubmitEmpresa(e) {
    const data = {
      rutEmpresa:e.rutEmpresa,
      nombreEmpresa: e.nombreEmpresa,
    };
    setLoading(true);
    setTimeout(() => {
      postAddEmpresa(data).then((response)=>{
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:"Empresa agregada correctamente.",msgError:false});
        setTimeout(() => {
          handleClose();
        },2500);
      }).catch((error)=>{
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:"Error, no se ha logrado agregar la empresa.",msgError:true});
      })
    }, 2000);
  }
  function errorSubmit(){
    return
  }
  return (
    // <div>
    //   <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
    //   <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        // onClose={handleClose}
      
        scroll={'paper'}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
      ><form
        name="registerForm"
        noValidate
        className="w-full"
        // onSubmit={}
        >
        <DialogTitle id="scroll-dialog-title"><div className="static ">
            <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Agregar Nueva Empresa <BusinessIcon/>
            </Typography>
            <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                <HighlightOffIcon />
            </IconButton>
            
            </div></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <div className='flex flex-col m-[20px]   min-w-[300px]'>
        
            <Controller
                    name="rutEmpresa"
                    
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        value={rutCompany}
                        onChange={e => {
                          field.onChange(e);
                          handleChangeRut(e);
                        }}
                     
                        className="w-full mb-[20px]"
                        label="Rut Empresa"
                        type="text"
                        error={!!errors.rutEmpresa}
                        helperText={errors?.rutEmpresa?.message}
                        variant="outlined"
                        required
                        />
                    )}
                    />
            <Controller
                    name="nombreEmpresa"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
            
                        className="w-full mt-[20px]"
                        label="Nombre Comercial"
                        onChange={e => {
                          field.onChange(e);
                          handleChangeName(e);
                        }}
                        type="text"
                        error={!!errors.nombreEmpresa}
                        helperText={errors?.nombreEmpresa?.message}
                        variant="outlined"
                        required
                        
                        />
                    )}
                    />
        </div>
        
        </DialogContent>
        <DialogActions className='flex justify-center m-[20px]'>
                
                <Button 
                  size="large"
                  className=" h-[28px]  w-[100px] mr-[20px]"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  onClick={handleClickOpen}
                  variant="contained"
                  color="secondary">
                    Guardar
                </Button>
                
                
                
                
            
        </DialogActions>
        <Dialog
          open={secondDopen}
          // onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          {loading?(<div className='flex justify-center items-center h-[250px] w-[300px]'>
            <CircularProgress color="secondary"/>
          </div>):(
          <div>
           {msgResp? (<div className='flex justify-center items-center h-[250px] w-[300px]' >
            {msgError? (<div className='flex justify-center items-center h-[250px] w-[300px]'>
              <WarningIcon className='w-[68px] h-[68px] text-red'/>
              <span className='absolute bottom-[70px] text-red'> <b>{msgText}</b></span>
            </div>):(<div className='flex justify-center items-center h-[250px] w-[300px]'>
              <CheckCircleIcon className='w-[68px] h-[68px] text-green'/>
              <span className='absolute bottom-[70px] text-green'> <b>{msgText}</b></span>
            </div>)}
            
           </div>):(<div>
            <DialogTitle id="alert-dialog-title">
            {"¿Desea guardar la siguiente empresa?"}
          </DialogTitle>
          <DialogContent className='flex flex-col' >
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Rut Empresa: <b className='text-black'>{rutCompany}</b>
            </Typography>
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Nombre Empresa: <b className='text-black'>{nameCompany}</b>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmitEmpresa)} autoFocus>
              Guardar
            </Button>
          </DialogActions>
           </div>)}
          
          </div>)}
    
                      
              
            
         
          
        </Dialog>
        </form>
        
      </Dialog>
    // </div>
  );
}