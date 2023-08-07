import { lazy } from "react";
// import AcuseteApp from "./AcuseteApp";
const AcuseteApp = lazy(() => import("./AcuseteApp"));

const AcuseteAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "analisis/Acusete",
      element: <AcuseteApp />,
    },
  ],
};

export default AcuseteAppConfig;
