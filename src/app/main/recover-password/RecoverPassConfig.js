import RecoverPass from './RecoverPass';
import authRoles from '../../auth/authRoles';

const RecoverPassConfig = {
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
      path: 'recover-password',
      element: <RecoverPass />,
    },
  ],
};

export default RecoverPassConfig;
