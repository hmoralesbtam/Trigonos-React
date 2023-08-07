const jwtServiceConfig = {
  signIn: " https://trigonosapi.azurewebsites.net/api/Usuarios/Login",
  signUp: " https://trigonosapi.azurewebsites.net/api/Usuarios/Registrar",
  addProyects:
    " https://trigonosapi.azurewebsites.net/api/Usuarios/AsignarProyecto",
  accessToken: " https://trigonosapi.azurewebsites.net/api/Usuarios",
  editUser: "https://trigonosapi.azurewebsites.net/api/Usuarios/actualizar/",
  addCompany: " https://trigonosapi.azurewebsites.net/api/Empresas/Agregar",
  addNewRol: " https://trigonosapi.azurewebsites.net/api/Rol/Agregar",
  updateUser: "api/auth/user/update",
};

export default jwtServiceConfig;
