import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facturacionClApi = createApi({
  reducerPath: "facturacionesCl",
  tagTypes: ["FacturacionesCl"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/FacturacionCl/",
  }),
  endpoints: (builder) => ({
    getFacturaById: builder.mutation({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/FacturacionBy/${id}`,
        method: "GET",
      }),
    }),
    getFactCLAll: builder.mutation({
      query: (spec) =>
        `/PaginationDecode?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
      providesTags: ["FacturacionesCl"],
    }),

    postFacturaAgregar: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Agregar/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FacturacionesCl"],
      // invalidatesTags: ["usuarios", "usuariosroles", "empresas"],
    }),
    postFacturaActualizar: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Actualizar/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FacturacionesCl"],
    }),
    refetchQueriesFact: builder.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["FacturacionesCl"],
    }),
  }),
});
export const {
  usePostFacturaAgregarMutation,
  usePostFacturaActualizarMutation,
  useGetFacturaByIdMutation,
  useRefetchQueriesFactMutation,
  useGetFactCLAllMutation,
} = facturacionClApi;
