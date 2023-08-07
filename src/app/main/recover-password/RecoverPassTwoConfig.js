import RecoverPassTwo from "./RecoverPassTwo";
import authRoles from "../../auth/authRoles";

const RecoverPassTwoConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "recover-password-two/:token/:email",
      element: <RecoverPassTwo />,
    },
  ],
};

export default RecoverPassTwoConfig;
