import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empresaApi = createApi({
  reducerPath: "empresas",
  tagTypes: ["empresas", "addempresa"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/Empresas",
  }),
  endpoints: (builder) => ({
    getEmpresas: builder.query({
      query: () => "",
      providesTags: ["empresas"],
    }),
    //Revisar como utilizar el patch si no cambialo por post en .net

    postAddEmpresa: builder.mutation({
      //  Objeto del body {idProyect:0,idUser:""}
      query: (asing) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Agregar/`,
        method: "POST",
        body: asing,
      }),
      providesTags: ["addempresa"],
      invalidatesTags: ["empresas"],
    }),
  }),
});
export const { useGetEmpresasQuery, usePostAddEmpresaMutation } = empresaApi;
