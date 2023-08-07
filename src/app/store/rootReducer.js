import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import { routesApi } from './RoutesRoles/routesApi';
import { instruccionesApi } from './instrucciones/instruccionesApi';
import { participantesApi } from './participantesApi/participantesApi';
import { usuariosApi } from './usuariosApi/usuariosApi';
import { empresaApi } from './empresaApi/empresaApi';
import { nominasApi } from './nominasApi/nominasApi';
import { facturacionClApi } from './facturacionClApi/facturacionClApi';
import { metricsApi } from './metricsApi/metricsApi';

const createReducer = (asyncReducers) => (state, action) => {
  
  const combinedReducer = combineReducers({
    [routesApi.reducerPath]: routesApi.reducer,
    [instruccionesApi.reducerPath]: instruccionesApi.reducer,
    [participantesApi.reducerPath]: participantesApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    [empresaApi.reducerPath]: empresaApi.reducer,
    [nominasApi.reducerPath]: nominasApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
    [facturacionClApi.reducerPath]: facturacionClApi.reducer,
    fuse,
    i18n,
    user,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
