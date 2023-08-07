import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import history from "@history";
import jwtService from "../../auth/services/jwtService";
//IMPORTACIONES OBSOLETAS, pueden que sirvan a un futuro si no eliminar..
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import emailjs from "@emailjs/browser";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Por favor ingrese una contraseña")
    .min(8, "Contraseña demasiado corta - mínimo 8 caracteres.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe tener almenos una mayuscula, un numero y un caracter especial"
    ),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
});

const defaultValues = {
  password: "",
  passwordConfirm: "",
};

function RecoverPassTwo() {
  const { token, email } = useParams();
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState(false);
  const [MsgEmail, setMsgEmail] = useState(false);
  const { control, formState, register, handleSubmit, setError, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
  const form = useRef();
  const { isValid, dirtyFields, errors } = formState;
  const callApiResetPassword = ({ password }) => {
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const urlApi =
      " https://trigonosapi.azurewebsites.net/api/Usuarios/ActualizarContrasena";
    const jsonApi = {
      password: password,
    };
    // axios
    //   .get(" https://trigonosapi.azurewebsites.net/api/Usuarios", yourConfig)
    axios
      .post(urlApi, jsonApi, yourConfig)
      .then((response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setMsgAlert(true);
        }, 4000);
        setTimeout(() => {
          history.push("/sign-in");
        }, 8000);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <div className="divLogo_">
            <img className="LogoTrgns" src="assets/images/logo/logoTRGNS.png" />
          </div>
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Recuperar Contraseña
          </Typography>

          <form
            ref={form}
            name="cambiarContrasena"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(callApiResetPassword)}
          >
            {!MsgAlert ? (
              <>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Contraseña"
                      type="password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Contraseña (Confirmar)"
                      type="password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="secondary"
                  className=" w-full mt-16"
                  aria-label="Sign in"
                  onClick={() => callApiResetPassword()}
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  size="large"
                >
                  Cambiar contraseña
                </LoadingButton>
              </>
            ) : (
              <span className="text-pantoneazul">
                <b>
                  Se ha cambiado exitosamente su contraseña, Sera redireccionado
                  al Inicio de sesion
                </b>
              </span>
            )}
          </form>
        </div>
      </Paper>
      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        id="box_der"
        sx={{ backgroundColor: "secondary.main" }}
      ></Box>
    </div>
  );
}

export default RecoverPassTwo;
