import { createSlice } from '@reduxjs/toolkit';
// import routes from 'app/configs/routesConfig';
export const roleSlice = createSlice({
    name: 'role',
    initialState: {
        role: [],
        isloading:false
    },
    reducers: {
        startLoadingRole: (state) => {
            state.isloading = true;
         },
         setRole: (state, action) => {
            state.isloading = false;
            state.role = action.payload.role;
          
          },
    }
});

export const { startLoadingRole,setRole } = roleSlice.actions;

export default roleSlice.reducer;