import FuseUtils from "@fuse/utils/FuseUtils";
import history from "@history";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";

/* eslint-disable camelcase */
let proyectUser;
class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    // localStorage.removeItem("token");
    // delete axios.defaults.headers.common.Authorization;
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      }
      // (err) => {
      //   return new Promise((resolve, reject) => {
      //     if (
      //       err.response.status === 401 &&
      //       err.config &&
      //       !err.config.__isRetryRequest
      //     ) {
      //       // if you ever get an unauthorized response, logout the user
      //       this.emit("onAutoLogout", "Invalid access_token");
      //       this.setSession(null);
      //     }
      //     throw err;
      //   });
      // }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    const idUser = this.getIdUser();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token, idUser);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "Tiempo de inactividad sobrepasado");
    }
  };
  handleAuthenticationInactivity = (access_token, idUser) => {
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token, idUser);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "Tiempo de inactividad sobrepasado");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.username) {
          this.setSession(response.data.token, response.data.id);
          resolve(response.data.username);
          this.emit("onLogin", response.data.username);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.username) {
            localStorage.removeItem("pagina");
            axios
              .get(
                "https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina"
              )
              .then((response) => {
                // console.log(response.data[0].nombrePagina);
                // console.log(response.data[0].nombrePagina);
                localStorage.setItem("pagina", response.data[0].nombrePagina);

                // array.push(response.data[0].nombrePagina);
                // if (array.includes("Facturacion")) {
                //   console.log("correctooo");
                // }
              })
              .catch((error) => {});
            setTimeout(() => {
              const url = ` https://trigonosapi.azurewebsites.net/api/Participantes?id=${response.data.id}`;
              let kaka;
              const prueba = async () => {
                let pruebaa;
                await axios.get(url).then((responsee) => {
                  pruebaa = responsee.data.data[0].id;
                });
                return pruebaa;
              };
              prueba().then((value) => {
                localStorage.setItem("ProyectUser", value);
              });
              const json = {
                token: response.data.token,
                idUser: response.data.id,
                role: response.data.role,
                data: {
                  displayName: response.data.username,
                  email: response.data.email,
                  nombre: response.data.nombre,
                  apellido: response.data.apellido,
                },
              };
              this.setSession(response.data.token, response.data.id);
              resolve(json);
              console.log("funciona");
              this.emit("onLogin", json);
            }, 2000);
          } else {
            console.log("no funciona");
          }
        })
        .catch((response) => {
          reject(response);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.username) {
            this.setSession(response.data.token, response.data.id);
            // console.log(response);
            localStorage.removeItem("pagina");
            axios
              .get(
                "https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina"
              )
              .then((response) => {
                // console.log(response.data[0].nombrePagina);
                // console.log(response.data[0].nombrePagina);
                localStorage.setItem("pagina", response.data[0].nombrePagina);

                // array.push(response.data[0].nombrePagina);
                // if (array.includes("Facturacion")) {
                //   console.log("correctooo");
                // }
              })
              .catch((error) => {});
            const json = {
              token: response.data.token,
              idUser: response.data.id,
              role: response.data.role,
              data: {
                displayName: response.data.username,
                email: response.data.email,
                nombre: response.data.nombre,
                apellido: response.data.apellido,
              },
            };
            resolve(json);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token, idUser) => {
    if (access_token) {
      localStorage.setItem("token", access_token);
      localStorage.setItem("idUser", idUser);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");

      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);

    this.emit("onLogout", "Logged out");
    history.push("/sign-in");

    localStorage.setItem("pagina", []);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("Tiempo de inactividad sobrepasado");
      return false;
    }
    return true;
  };

  getAccessToken = () => {
    // console.log(window.localStorage.getItem("token"));
    return window.localStorage.getItem("token");
  };

  getIdUser = () => {
    // console.log(window.localStorage.getItem("token"));
    return window.localStorage.getItem("idUser");
  };
}

const instance = new JwtService();

export default instance;
