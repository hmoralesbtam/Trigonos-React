import "@mock-api";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import settingsConfig from "app/configs/settingsConfig";

import { AuthProvider } from "./auth/AuthContext";
import { getRole } from "./store/Role";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";

import AppContext from "./AppContext";

import React, { createContext, useEffect, useState, useContext } from "react";

import { Navigate } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";
import Error404Page from "./main/404/Error404Page";
import FuseUtils from "@fuse/utils";
import SignUpConfig from "./main/sign-up/SignUpConfig";
import SignInConfig from "./main/sign-in/SignInConfig";

import ProfileApp from "./main/profile/ProfileApp";
import ExampleConfig from "./main/example/ExampleConfig";
import SignOutConfig from "./main/sign-out/SignOutConfig";
import RecoverPassConfig from "./main/recover-password/RecoverPassConfig";
import RecoverPassTwoConfig from "./main/recover-password/RecoverPassTwoConfig";
import { ComercialConfigs } from "./main/comercial/ComercialConfigs";
import AnalisisConfig from "./main/analisis/AnalisisConfig";
import { AdministracionConfig } from "./main/administracion/AdministracionConfig";
import { gestionConfig } from "./main/gestion/gestionConfig";
import {
  useGetAllRolesQuery,
  useGetAllRoutesQuery,
  useGetOnlyHabilitRoutesQuery,
} from "./store/RoutesRoles/routesApi";
import { ProfileAppConfig } from "./main/profile/ProfileAppConfig";
import {
  appendNavigationItem,
  selectNavigation,
  selectNavigationAll,
  setAsyncNavigation,
} from "./store/fuse/navigationSlice";
import { navigationConfigAsync } from "./configs/navigationConfigAsync";
import navigationConfig from "./configs/navigationConfig";

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};
// Crear el contexto
export const AppContextRoutes = createContext();

// Componente que contiene el Provider
const AppContextProvider = ({ children }) => {
  const dispatch = useDispatch();


  const {data: roles =[],isLoading: isloadingRol =true} = useGetAllRolesQuery();
  const {data: todoshabilit =[],isLoading: isloading =true} = useGetOnlyHabilitRoutesQuery();
  const user = useSelector(selectUser);

 

  
  function getListRoless(idPagina){
    return (todoshabilit.filter(
      (item) => item.idpagina=== idPagina
    )).map(function(el) {
      return el.nombreRol         
    });
  }


  useEffect(() => {
 
   
  }, []);
 
  useEffect(() => {
    let defaultAuth = roles.map(function(el) {
      return el.name         
    })
    dispatch(setAsyncNavigation(navigationConfigAsync(defaultAuth,todoshabilit)))
    
  }, [isloadingRol,isloading])
  



  if (isloading===false){
    function getListRoles(idPagina){
      return (todoshabilit.filter(
        (item) => item.idpagina=== idPagina
      )).map(function(el) {
        return el.nombreRol         
      });
    }
    const routeConfigs = [
      ExampleConfig,
      SignOutConfig,
      SignInConfig,
      SignUpConfig,
      RecoverPassConfig,
      RecoverPassTwoConfig,
      ...ComercialConfigs(todoshabilit),
      ...AnalisisConfig,
      ...AdministracionConfig(todoshabilit), //los que contienen el spread se les pasa el objeto completo
      ...gestionConfig(todoshabilit),
      ProfileAppConfig(getListRoles(3)),
    ];
    let defaultAuth = roles.map(function(el) {
      return el.name         
    })
    


    
    const routes = [
      ...FuseUtils.generateRoutesFromConfigs(routeConfigs, defaultAuth),
      {
        path: "/",
        element: getListRoless(9).includes(user.role)? <Navigate to="/comercial/estadoFacturacionV2" /> :<Navigate to="/sign-in" />,
        auth: defaultAuth,
      },
      {
        path: "loading",
        element: <FuseLoading />,
      },
      {
        path: "404",
        element: <Error404Page />,
      },
      {
        path: "*",
        element: <Navigate to="404" />,
      },
    ];
   
    
    
      return (
     
     
           <AppContext.Provider value={{ routes }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            
              <StyledEngineProvider injectFirst>
               { children}
              </StyledEngineProvider>
          
          </LocalizationProvider>
        </AppContext.Provider>
    
       
    
      );
    

  }
};

// Uso del contexto en un componente hijo directo del Provider
const ChildComponent = () => {
  const data = useContext(AppContextRoutes);

  // Renderizar el componente utilizando los datos del contexto
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

// En el componente raíz de la aplicación, envolver los componentes con el Provider
const AppAsync = () => {
  const data = useContext(AppContextRoutes);
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  // useEffect(()=>{

  // },[])
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  const { isloading, role } = useSelector((state) => state.fuse.roleSlice);

  useEffect(() => {
    dispatch(getRole());
  }, []);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <AuthProvider>
          <BrowserRouter>
            <FuseAuthorization
              userRole={user.role}
              loginRedirectUrl={settingsConfig.loginRedirectUrl}
            >
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                classes={{
                  containerRoot:
                    "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                }}
              >
                <FuseLayout layouts={themeLayouts} />
              </SnackbarProvider>
            </FuseAuthorization>
          </BrowserRouter>
        </AuthProvider>
      </FuseTheme>
    </CacheProvider>
  );
};
export default AppAsync;
