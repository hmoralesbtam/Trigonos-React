
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EditIcon from "@mui/icons-material/Edit";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import Switch from '@mui/material/Switch';
import { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import { Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputAdornment from "@mui/material/InputAdornment";
import { useGetAllRoutesQuery, useGetListarPaginaWebQuery, usePostDeshabilitarRolMutation, usePostEditRolMutation, usePostHabilitarRolMutation, usePostNewRolMutation, usePostNewRolPagesMutation } from "app/store/RoutesRoles/routesApi";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import CachedIcon from '@mui/icons-material/Cached';
import Tooltip from '@mui/material/Tooltip';
const schema = yup.object().shape({
  // user: yup.string().required("Debe ingresar su nombre completo"),
  
  nombre: yup
    .string()
    .required("Debe ingresar un Nombre"),
  descripcion: yup
    .string()
    .required("Debe ingresar una Descripción"),
});
const defaultValues = {

  nombre: "",
  descripcion: "",
  
  
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalAddProfile({
    setTable,
    tipoModal ,//true es para un nuevo perfil, false es para editar un perfil
    dataRol,
    dataAsing,
    dataNoAsing,

}) {
  
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState('paper');
  const [secondDopen, setSecondDopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [postHabilitarRol, data_] = usePostHabilitarRolMutation();
  const [postDeshabilitarRol, data] = usePostDeshabilitarRolMutation();
  const [postNewRol, data__] = usePostNewRolMutation();
  const [postNewRolPages, data_rolpages_] = usePostNewRolPagesMutation();
  const [postEditRol,dataEditRol] = usePostEditRolMutation()
  
  const {data: dataWeb =[],isLoading: isloadingListar =true} = useGetListarPaginaWebQuery();  //Son las paginas web que estan disponibles en la BD.

  const postHabilitarRolPagina = async (data) => {
    try {
      await postHabilitarRol(data);
      // console.log(response); // Manejar la respuesta exitosa
    } catch (error) {
      // console.error(error); // Manejar el error
    }
  };
  const postDeshabilitarRolPagina = async (data) => {
    try {
      await postDeshabilitarRol(data);
      // console.log(response); // Manejar la respuesta exitosa
    } catch (error) {
      // console.error(error); // Manejar el error
    }
  };
  const [nameRol, setNameRol] = useState("");
  const [descRol, setDescRol] = useState("");
  const [idprueba, setidprueba] = useState(2);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText:"",
    msgError:false,
  });
  const {msgResp,msgText,msgError} = MsgAlert;
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors} = formState;
 
  
  // const [paginasConAsign, setPaginasConAsign] = useState(todos);
  const [checked, setChecked] = useState([]);//tipoModal?dataWeb:dataAsing
  const [checkeddos, setCheckedDos] = useState([]); //tipoModal?dataWeb:dataNoAsing

  const [dataState, setDataState] = useState({
    id: dataRol.id,
    nombre: dataRol.nombre,
    descripcion: dataRol.descripcion,
    ventanasAsing:dataAsing,
   
  });
  const [dataConfirm, setDataConfirm] = useState({
    id: dataRol.id,
    nombre: dataRol.nombre,
    descripcion: dataRol.descripcion,
    ventanasAsing:dataAsing,
  });
  const [update, setUpdate] = useState({
    nombre: false,
    descripcion: false,
   
  });
  const {
    nombre,
    descripcion
  } = update;

  useEffect(() => {
    //Elimina del checked las paginas que no tienen un rol habilitado !=0
    RevertirSeleccion();

  }, [])

  function RevertirSeleccion(){
    
    setChecked(tipoModal?[]:dataAsing.filter(
      (item) => item.bhabilitado!= 0
    ));
  }
  const handleToggleAll = (items) => () => {
    // setCheckeddos([]);
    if (checked.length != (tipoModal? dataWeb.length:dataAsing.length)) {
      setChecked(tipoModal? dataWeb:dataAsing);
      setDataState({...dataState,ventanasAsing: dataWeb} )
    } else {
      setChecked([]);
    }
  };
  const handleToggleAlldos = (items) => () => {
    // setChecked([]);
    if (checkeddos.length != dataNoAsing.length) {
      setCheckedDos(dataNoAsing);
    } else {
      setCheckedDos([]);
    }
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setDataState({...dataState,ventanasAsing: newChecked} )
  };
  const handleToggledos = (value) => () => {
    const currentIndex = checkeddos.indexOf(value);
    const newChecked = [...checkeddos];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedDos(newChecked);
  
  };
  function DinamicHabDesac(object){ //Funcion para activar y deshactivar dinamicamente
    
    let objDesactivado=object.filter(//los objetos desactivados seran activados
      (item) => item.bhabilitado=== 0
    )
   
    // addNewPost(2)
    for (let x = 0; x < objDesactivado.length; x++) {
      // console.log(objDesactivado[x].id)
      // console.log(x)
      // console.log(objDesactivado.length-1)
      postHabilitarRolPagina(objDesactivado[x].id);
      if (x === objDesactivado.length -1){
        //hacer algo aqui nose
      }
    }
   //los objetos activados que han sido desactivados seran desactivados
    let ids = object.map(function (el) {
      return el.id;
    });
    let objActivado = dataAsing.filter(
      (item) => !ids.includes(item.id) && item.bhabilitado=== 1
    );
    for (let x = 0; x < objActivado.length; x++) {
      // console.log(objDesactivado[x].id)
      // console.log(x)
      // console.log(objDesactivado.length-1)
      postDeshabilitarRolPagina(objActivado[x].id);
      if (x === objActivado.length -1){
        //hacer algo aqui nose
      }
    }
   
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  
  function DinamicAddPagesRoles(objectArray,idRol){ //Funcion para activar y deshactivar dinamicamente
    
    for (let x = 0; x < objectArray.length; x++) {
     
      let data = {
        idrol:idRol,
        idpagina:  objectArray[x].id,
        bhabilitado: 1
      }
      postNewRolPages(data);
      if (x === objectArray.length -1){
        //hacer algo aqui nose
        
      }
    }
  

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  const onInputChange = ({ target }) => {
      const { name, value } = target;
  
      setDataState({
        ...dataState,
        [name]: value,
      });
    };

  const handleClose = () => {
    setOpen(false);
    setTable();
   
  };
  const handleClickOpen = () => {
    setSecondDopen(true);
    setMsgAlert({
        msgResp: false,
        msgText:"",
        msgError:false,
      });
  };
  const handleCloseAlert = () => {
    setSecondDopen(false);
  };
 
  const handleChangeNombre = event => {
    setNameRol(event.target.value);
  };
  const handleChangeDesc = event => {
    setDescRol(event.target.value);
  };
  function onSubmitRol(e) {

    const data = {
      name: e.nombre,
      descripcion: e.descripcion,
      bhabilitado: 0,
    };
    setLoading(true);
    if(checked.length>0){
      setTimeout(() => {
        postNewRol(data).then((response)=>{
         
        
          DinamicAddPagesRoles(checked,response.data.id);
          setLoading(false);
          setMsgAlert({msgResp: true,msgText:"Rol agregado correctamente.",msgError:false});
          setTimeout(() => {
            handleClose();
          },2500);
        }).catch((error)=>{
          setLoading(false);
          setMsgAlert({msgResp: true,msgText:"Error, no se ha logrado agregar el Rol.",msgError:true});
          setTimeout(() => {
            handleClose();
          },2500);
        });
  
       
      }, 2000);
    }else{
      setTimeout(() => {
        setLoading(false);
          setMsgAlert({msgResp: true,msgText:"Debe seleccionar una o mas ventanas",msgError:true});
          setTimeout(() => {
            setSecondDopen(false);
          },2500);
      }, 1000);
    }
    
  
  }
  function onSubmitEditRol() {
    setLoading(true);
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(dataState);
    console.log(((dataState.nombre).trim()) === ((dataConfirm.nombre).trim()));
 
    if (isEqual && (checkeddos.length) ===0 && ((dataState.nombre).trim()) === ((dataConfirm.nombre).trim()) &&((dataState.descripcion).trim() === (dataConfirm.descripcion).trim())) {
      // console.log("No se realiza envio a API");
      setTimeout(() => {

        setLoading(false);
        setMsgAlert({
          msgResp: true,
          msgText: "Advertencia, debe realizar un cambio!",
          msgError: true,
        });
        setTimeout(() => {
          setSecondDopen(false)
        }, 1000);
      },1000);
    } else {
      setTimeout(() => {
        if(dataNoAsing.length>0){
          DinamicAddPagesRoles(checkeddos,dataRol.id);
        }
        DinamicHabDesac(checked);
        console.log(dataState.nombre)

        postEditRol({
          id:dataRol.id,
          data:{ name: (dataState.nombre).trim() != (dataConfirm.nombre).trim()? dataState.nombre:null,
            descripcion:(dataState.descripcion).trim() != (dataConfirm.descripcion).trim()? dataState.descripcion:null,
            bhabilitado: 1}
         
        }).catch((error)=>{
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:`Error a causa del nombre o descripción,${error}`,msgError:true});
        setTimeout(() => {
          handleClose();
        },2500);
        })
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:"Rol agregado correctamente.",msgError:false});
        setTimeout(() => {
          handleClose();
        },2500);
        
        // setLoading(false);
        // setMsgAlert({msgResp: true,msgText:"Error, no se ha logrado agregar el Rol.",msgError:true});
        // setTimeout(() => {
        //   handleClose();
        // },2500);
      
  
       
      }, 2000);
    }
  }
  if(tipoModal){
   return( 
   <Dialog
    open={open}
    // onClose={handleClose}
  
    scroll={'paper'}
     aria-labelledby="scroll-dialog-title"
     aria-describedby="scroll-dialog-description"
  >

  
    <DialogTitle id="scroll-dialog-title"><div className="static ">
            
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
              Agregar Nuevo Perfil <RecentActorsIcon/>
              </Typography>
            

            
            <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                <HighlightOffIcon />
            </IconButton>
        
        </div></DialogTitle>
    <DialogContent dividers={scroll === 'paper'} className="min-w-[400px]">
      <div>
        <form
            name="registerForm"
            noValidate
            className="w-full"
            // onSubmit={}
            >
                <div className="ml-[10px] mr-[10px] flex flex-col">
                        
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
            
                        className="w-full mt-[20px]"
                        label="Nombre Rol"
                        onChange={e => {
                          field.onChange(e);
                          handleChangeNombre(e);
                        }}
                        type="text"
                        error={!!errors.nombre}
                        helperText={errors?.nombre?.message}
                        variant="filled"
                        required
                        
                        />
                    )}
                  />
                  <Controller
                    name="descripcion"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        multiline
                        className="w-full mt-[20px]"
                        label="Descripción Rol"
                        onChange={e => {
                          field.onChange(e);
                          handleChangeDesc(e);
                        }}
                        type="text"
                        error={!!errors.descripcion}
                        helperText={errors?.descripcion?.message}
                        variant="filled"
                        required
                        
                        />
                    )}
                  />
                </div>
                <div className="ml-[10px] mr-[10px] flex flex-col">
                  <div>
                  {/* <IconButton edge="end" aria-label="comments"
                                 onClick={() => {
                                  DinamicHabDesac(checked);

                                }} 
                                >
                    <CachedIcon />
                  </IconButton> */}
                  <Typography className="text-xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px] w-auto">
                    Ventanas disponibles para asignar
                  </Typography>
            
                  <div className="max-h-[300px] mt-[10px]">
                    <Card>
                    <ListItem
                            key="{value.id}"
                            // secondaryAction={
                            //   <Tooltip title="Revertir Cambios">
                            //     <IconButton edge="end" aria-label="comments"
                            //      onClick={() => {
                            //       RevertirSeleccion();
                            //     }} 
                            //     >
                            //       <CachedIcon />
                            //     </IconButton>
                            //   </Tooltip>
                            // }
                            disablePadding
                          >
                        <ListItemButton
                          onClick={handleToggleAll(dataWeb)}
                          disabled={!checked.length === 0}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                checked.length === dataWeb.length &&
                                checked.length !== 0
                              }
                              indeterminate={
                                checked.length !== dataWeb.length &&
                                checked.length !== 0
                              }
                              inputProps={{
                                "aria-label": "all items selected",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText id="nose" primary="Seleccionar todo" />
                      </ListItemButton>
                          </ListItem>
                    
                    <Divider />
                    <List
                      sx={{
                        height: "300px",
                        width: "100%",
                        // maxWidth: 300,
                        bgcolor: "background.paper",
                        overflow: "auto",
                      }}
                    >
                      {dataWeb.map((value) => {
                        const labelId = `checkbox-list-label-${value.id}`;

                        return (
                          <ListItem
                            key={value.id}
                            // secondaryAction={
                            //   <IconButton edge="end" aria-label="comments">
                            //     <CommentIcon />
                            //   </IconButton>
                            // }
                            disablePadding
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  // inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.nombre} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                    </Card>
                  </div>
                  </div>
                 
                  <div className="h-[60px]">
                  
                  </div>
                
               
                 
               
                </div>
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
              {checked.length>0? <> <WarningIcon className='w-[68px] h-[68px] text-red'/>
              <span className='absolute bottom-[70px] text-red'> <b>{msgText}</b></span>
              </>
              : <> <ErrorOutlineIcon className='w-[68px] h-[68px] text-pantoneazul'/>
              <span className='absolute bottom-[70px] text-pantoneazul'> <b>{msgText}</b></span>
              </>}
              
            </div>):(<div className='flex justify-center items-center h-[250px] w-[300px]'>
              <CheckCircleIcon className='w-[68px] h-[68px] text-green'/>
              <span className='absolute bottom-[70px] text-green'> <b>{msgText}</b></span>
            </div>)}
            
          </div>):(<div>
            <DialogTitle id="alert-dialog-title">
            {"¿Desea guardar el siguiente Rol?"}
          </DialogTitle>
          <DialogContent className='flex flex-col' >
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Nombre del Rol:
             {/* <b className='text-black'>{dataState.nombre}</b> */}
            </Typography>
            <div className="border-2 border-sky-500 max-w-[300px]">
            <Typography className="text-lg font-medium text-black  m-[10px]">
            {nameRol}
            
            </Typography>
            </div>
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Descripción del Rol:
            </Typography>
            <div className="border-2 border-sky-500 max-w-[300px]">
            <Typography className="text-lg font-medium   m-[10px]">
              {descRol}
           
            
            </Typography>
            </div>
          </DialogContent>
          {/* <DialogContent className='flex flex-col' >
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Nombre del Rol: <b className='text-black'>{nameRol}</b>
            </Typography>
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Descripción del Rol: <b className='text-black'>{descRol}</b>
            </Typography>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmitRol)} autoFocus>
              Guardar
            </Button>
          </DialogActions>
          </div>)}
          </div>)}
        </Dialog>
        </form>
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
    
   
  </Dialog>)
  }else{
    return(<Dialog
    open={open}
    // onClose={handleClose}
  
    scroll={'paper'}
     aria-labelledby="scroll-dialog-title"
     aria-describedby="scroll-dialog-description"
  >

  
    <DialogTitle id="scroll-dialog-title"><div className="static ">
            
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
              Edición de Perfil <RecentActorsIcon/>
              </Typography>
            

            
            <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                <HighlightOffIcon />
            </IconButton>
        
        </div></DialogTitle>
    <DialogContent dividers={scroll === 'paper'} className="min-w-[450px]">
      <div>
      <form
            name="registerForm"
            noValidate
            className="w-full"
            // onSubmit={}
            >
                <div className="ml-[10px] mr-[10px] flex flex-col">
                        
                 
                    <div className="h-[20px]">
                    {nombre ? (
                      <>
                        <span className="text-red-500">
                          Recuerde aceptar o cancelar el cambio realizado
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    </div>
                   <Controller
                    name="nombre"
                    control={control}
                    defaultValue="Vacio"
                    render={({ field}) => (
                    <TextField
                    {...field}
                    
                    className=" w-full "
                    label="Nombre Rol"
                    type="text"
                    // defaultValue="Vacio" Nota no ocupar un defaultValue en el chield ocuparlo en el controller
                    // name="nombre"
                    value={dataState.nombre}
                    onChange={e => {
                      
                      field.onChange(e);
                      onInputChange(e);
                      handleChangeNombre(e);
                    }}
                  
                    disabled={nombre ? false : true}
                   
                    InputProps={{
                      // value:dataState.nombre,
                      // name:"nombre",
                      // readOnly:nombre ? false : true,
                      startAdornment: (
                        <InputAdornment position="start">
                          {nombre ? (
                            <>
                              <CheckBoxIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setUpdate({
                                    ...update,
                                    nombre: false,
                                  });
                                  setCountActive(
                                    countActive > 0
                                      ? countActive - 1
                                      : countActive
                                  );
                                }}
                              />
                              <DisabledByDefaultIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDataState({
                                    ...dataState,
                                    nombre: dataRol.nombre,
                                  });
                                  
                                  setUpdate({
                                    ...update,
                                    nombre: false,
                                  });
                                  setCountActive(
                                    countActive > 0
                                      ? countActive - 1
                                      : countActive
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  nombre: true,
                                });
                                setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.nombre}
                    helperText={errors?.nombre?.message}
                    variant="filled"
                    required
                    />
                )}/>
                <div className="h-[20px]">
                    {descripcion ? (
                      <>
                        <span className="text-red-500">
                          Recuerde aceptar o cancelar el cambio realizado
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    </div>
                   <Controller
                    name="descripcion"
                    control={control}
                    defaultValue="Vacio"
                    render={({ field}) => (
                    <TextField
                    {...field}
                    id="filled-multiline-flexible"
                    className=" w-full "
                    label="Descripción Rol"
                    multiline
                    type="text"
                    // defaultValue="Vacio" Nota no ocupar un defaultValue en el chield ocuparlo en el controller
                    // name="descripcion"
                    value={dataState.descripcion}
                    onChange={e => {
                      
                      field.onChange(e);
                      onInputChange(e);
                      handleChangeNombre(e);
                    }}
                  
                    disabled={descripcion ? false : true}
                   
                    InputProps={{
                      readOnly:descripcion ? false : true,

                      startAdornment: (
                        <InputAdornment position="start"
                        style={{
                          maxHeight: 'none',
                          height: 'auto',
                          marginTop: '-1px',
                          marginRight: '5px',
                          marginBottom: '-1px',
                         }}
                         >
                          {descripcion ? (
                            <>
                              <CheckBoxIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setUpdate({
                                    ...update,
                                    descripcion: false,
                                  });
                                  setCountActive(
                                    countActive > 0
                                      ? countActive - 1
                                      : countActive
                                  );
                                }}
                              />
                              <DisabledByDefaultIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDataState({
                                    ...dataState,
                                    descripcion: dataRol.descripcion,
                                  });
                                  setUpdate({
                                    ...update,
                                    descripcion: false,
                                  });
                                  setCountActive(
                                    countActive > 0
                                      ? countActive - 1
                                      : countActive
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  descripcion: true,
                                });
                                setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.descripcion}
                    helperText={errors?.descripcion?.message}
                    variant="filled"
                    required
                    />
                )}/>
                </div>
                <div className="ml-[10px] mr-[10px] flex flex-col">
                  <div>
                  <Typography className="text-xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px] w-auto">
                    Ventanas Asignadas  <ScreenshotMonitorIcon/>
                    {/* {dataRol.nombre} */}
                  </Typography>
            
                  <div className="max-h-[300px] mt-[10px]">
                    <Card>
                    <ListItem
                            key="{value.id}"
                            secondaryAction={
                              <Tooltip title="Revertir Cambios">
                                <IconButton edge="end" aria-label="comments"
                                 onClick={() => {
                                  RevertirSeleccion();
                                }} 
                                >
                                  <CachedIcon />
                                </IconButton>
                              </Tooltip>
                            }
                            disablePadding
                          >
                        <ListItemButton
                          onClick={handleToggleAll(dataAsing)}
                          disabled={!checked.length === 0}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                checked.length === dataAsing.length &&
                                checked.length !== 0
                              }
                              indeterminate={
                                checked.length !== dataAsing.length &&
                                checked.length !== 0
                              }
                              inputProps={{
                                "aria-label": "all items selected",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText id="nose" primary="Seleccionar todo" />
                      </ListItemButton>
                          </ListItem>
                    
                    <Divider />
                    <List
                      sx={{
                        height: "300px",
                        width: "100%",
                        // maxWidth: 300,
                        bgcolor: "background.paper",
                        overflow: "auto",
                      }}
                    >
                      {dataAsing.map((value) => {
                        const labelId = `checkbox-list-label-${value.id}`;

                        return (
                          <ListItem
                            key={value.id}
                            // secondaryAction={
                            //   <IconButton edge="end" aria-label="comments">
                            //     <CommentIcon />
                            //   </IconButton>
                            // }
                            disablePadding
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  // inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText id={value.id} primary={value.nombrePagina} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                    </Card>
                  </div>
                  </div>
                 
                  <div className="h-[60px]">
                  
                  </div>
                  {dataNoAsing.length>0?<>
                    <Typography className="text-xl font-medium text-pantoneazul leading-6 truncate mt-[5px] w-auto">
                    Ventanas No Asignadas  <DesktopAccessDisabledIcon/>
                  </Typography>
                  <div className="max-h-[300px] mt-[10px]">
                      <Card>
                      <ListItemButton
                          onClick={handleToggleAlldos(dataNoAsing)}
                          disabled={!checkeddos.length === 0}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={
                                checkeddos.length === dataNoAsing.length &&
                                checkeddos.length !== 0
                              }
                              indeterminate={
                                checkeddos.length !== dataNoAsing.length &&
                                checkeddos.length !== 0
                              }
                              inputProps={{
                                "aria-label": "all items selected",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText id="nose" primary="Seleccionar todo" />
                      </ListItemButton>
                      <Divider />
                      <List
                        sx={{
                          height: "300px",
                          width: "100%",
                          // maxWidth: 300,
                          bgcolor: "background.paper",
                          overflow: "auto",
                        }}
                      >
                        {dataNoAsing.map((value) => {
                          const labelId = `checkbox-list-label-${value.id}`;

                          return (
                            <ListItem
                              key={value.id}
                              // secondaryAction={
                              //   <IconButton edge="end" aria-label="comments">
                              //     <CommentIcon />
                              //   </IconButton>
                              // }
                              disablePadding
                            >
                              <ListItemButton
                                role={undefined}
                                onClick={handleToggledos(value)}
                                dense
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checkeddos.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    // inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={value.id} primary={value.nombre} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                      </Card>
                  </div></>:<></>}
                
               
                 
               
                </div>
                
                 
                
        
            <Dialog
            open={secondDopen}
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
            {"Confirmar cambios"}
          </DialogTitle>
          <DialogContent className='flex flex-col' >
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Nombre del Rol:
             {/* <b className='text-black'>{dataState.nombre}</b> */}
            </Typography>
            <div className="border-2 border-sky-500 max-w-[300px]">
            <Typography className="text-lg font-medium text-black  m-[10px]">
            {dataState.nombre}
            
            </Typography>
            </div>
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Descripción del Rol:
            </Typography>
            <div className="border-2 border-sky-500 max-w-[300px]">
            <Typography className="text-lg font-medium   m-[10px]">
              {dataState.descripcion}
           
            
            </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={onSubmitEditRol} > 
              Guardar
            </Button>
          </DialogActions>
          </div>)}
          </div>)}
        </Dialog>
      </form>  
      </div>
      
    
    </DialogContent>
    <DialogActions className='flex justify-center m-[20px]'>
  
            <Button 
                size="large"
                className=" h-[28px]  w-[100px] mr-[20px]"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={handleClickOpen}
                variant="contained"
                color="secondary">
                  Guardar
              </Button>
                    
        
    </DialogActions>
    
   
  </Dialog>)
  }

  

  
}
