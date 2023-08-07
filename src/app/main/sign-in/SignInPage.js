/* eslint-disable jsx-a11y/alt-text */

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import jwtService from "../../auth/services/jwtService";
import LoadingButton from '@mui/lab/LoadingButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//IMPORTACIONES OBSOLETAS, pueden que sirvan a un futuro si no eliminar..
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debes ingresar un email válido")
    .required("Por favor ingrese su email asociado a su cuenta"),
  password: yup
    .string()
    .required("Por favor ingrese su contraseña asociada a su cuenta")
    .min(4, "la contraseña es debasiado pequeña"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  const { control, formState, register, handleSubmit, setError, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
  const { isValid, dirtyFields, errors } = formState;



  function onSubmit({ email, password }) {
    setMsgAlert(false);
    setLoading(true);
    setTimeout(() => {
      jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .finally((response) => {
        setLoading(false);
        setMsgAlert(true);
      });
      // let {resp} = jwtService
      // .signInWithEmailAndPassword(email, password);
      // if(jwtService
      //   .signInWithEmailAndPassword(email, password)){
      //     setLoading(false);
      // }else{
      //   setLoading(false);
      // }
      
      
    }, 2000);
    
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <div className="divLogo_">
            <img className="LogoTrgns" src="assets/images/logo/LogoTRGNS.png" />
          </div>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Iniciar Sesión
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            {/* <Typography>¿No tiene una cuenta?</Typography>
            <Link className="ml-4" to="/sign-up">
              Registrarse
            </Link> */}
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  onClick={() => {
                    setMsgAlert(false);
                  }}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
            
              name="password"
              
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  onClick={() => {
                    setMsgAlert(false);
                  }}
                  InputProps={{
                    endAdornment:
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                  }

                  }
                  
                />
             
                
              )}
            />
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl
                    disabled>
                    <FormControlLabel
                      label="Recordarme"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/recover-password">
                ¿Ha olvidado su contraseña?
              </Link>
            </div>

            {/* <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large">
              Iniciar Sesión
            </Button> */}
            <LoadingButton 
            
              loading={loading}
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              variant="contained"
              color="secondary">
                Iniciar Sesión
            </LoadingButton>
            <div className="h-[30px] text-center mt-[20px]">
              {MsgAlert && (
                  
                  <span className="text-red">
                   <b>Email o contraseña incorrectos, intente nuevamente</b>
                  </span>
                )}
            </div>
            
          </form>
        </div>
      </Paper>
      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        id="box_der"
        sx={{ backgroundColor: "secondary.main" }}></Box>
    </div>
  );
}

export default SignInPage;
