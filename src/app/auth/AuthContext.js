import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, selectUser, setUser } from "app/store/userSlice";
import jwtService from "./services/jwtService";
import history from "@history";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  // selectNavigationAll
 
  
  useEffect(() => {
    jwtService.on("onAutoLogin", () => {
      dispatch(showMessage({ message: "iniciando sesión" }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, "Ha iniciado sesión");
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on("onLogin", (user) => {
      success(user, "Sesión iniciada");
    });

    jwtService.on("onLogout", () => {
      pass("Se ha cerrado su sesión");

      dispatch(logoutUser());
    });

    jwtService.on("onAutoLogout", (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        // history.push("/example");
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
