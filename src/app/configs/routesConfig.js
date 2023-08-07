import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import RecoverPassConfig from "../main/recover-password/RecoverPassConfig";
import Error404Page from "../main/404/Error404Page";
import ExampleConfig from "../main/example/ExampleConfig";
import ComercialConfigs from "../main/comercial/ComercialConfigs";
import AnalisisConfig from "../main/analisis/AnalisisConfig";
import AdministracionConfig from "../main/administracion/AdministracionConfig";
import ProfileAppConfig from "../main/profile/ProfileAppConfig";
import RecoverPassTwoConfig from "../main/recover-password/RecoverPassTwoConfig";

const routeConfigs = [
  ExampleConfig, 
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  RecoverPassConfig,
  RecoverPassTwoConfig,
  ...ComercialConfigs,
  ...AnalisisConfig,
  ...AdministracionConfig,
  ProfileAppConfig,
];


const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/comercial/estadoFacturacionV2" />,
    // auth: settingsConfig.defaultAuth,
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

export default routes;
