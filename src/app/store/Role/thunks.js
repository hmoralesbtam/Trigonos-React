import { roleApi } from "./roleApi";
import { setRole, startLoadingRole } from "./roleSlice";

export const getRole =( id = 0 ) => {
    return async( dispatch , getState ) => {
        dispatch(startLoadingRole());
        
       
        const {data} = await roleApi.get("/listarRolPagina")



       dispatch(setRole({
        role: data
       }));
       
       // dispatch(setPokemons())

    }


}