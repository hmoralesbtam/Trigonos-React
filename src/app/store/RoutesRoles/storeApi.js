import { configureStore } from "@reduxjs/toolkit";
import { routesApi } from "./routesApi";
export const storeApi = configureStore({
    reducer:{

        [routesApi.reducerPath]: routesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(routesApi.middleware)
    
})