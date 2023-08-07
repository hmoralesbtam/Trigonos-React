import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usuariosApi = createApi({
  reducerPath: "usuarios",
  tagTypes: ["usuarios", "usuariosroles"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/Usuarios",
  }),
  endpoints: (builder) => ({
    getUsuarios: builder.query({
      query: () => "",
    }),
    getNumUsuarios: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${spec.token}`,
        },
        url: "/NumUsuarios",
        method: "GET",
      }),
      providesTags: ["usuarios"],
    }),
    getUsuariosPagination: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${spec.token}`,
        },
        url: spec
          ? `/Pagination?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}` +
            (spec.nombre != undefined ? `&Nombre=${spec.nombre}` : "") +
            (spec.apellido != undefined ? `&Apellido=${spec.apellido}` : "") +
            (spec.sort != undefined ? `&Sort=${spec.sort}` : "") +
            (spec.search != undefined ? `&Search=${spec.search}` : "")
          : "/Pagination",
        method: "GET",
      }),
      providesTags: ["usuarios"],
    }),

    getUsuariosRoles: builder.query({
      query: () => "/rolesUsers",
      providesTags: ["usuariosroles"],
    }),
    getUsuariosById: builder.query({
      query: (id) => `/account/${id}`,
    }),
    postUsuariosAsingProyect: builder.mutation({
      //  Objeto del body {idProyect:0,idUser:""}
      query: (asing) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/AsignarProyecto/`,
        method: "POST",
        body: asing,
      }),
    }),
    postUsuariosLogin: builder.mutation({
      //  Objeto del body {email:"",password:""}
      query: (login) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Login/`,
        method: "POST",
        body: login,
      }),
    }),
    postUsuariosRegistrar: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/registrar/`,
        method: "POST",
        body: data,
      }),
    }),
    postUsuariosActualizar: builder.mutation({
      //  Objeto del body {idUser:"", newData:{email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rolIdAnterior:"",rolIdNuevo:""}}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/actualizar/${data.idUser}?actualizarDto=`,
        method: "POST",
        body: data.newData,
      }),
      invalidatesTags: ["usuarios", "usuariosroles", "empresas"],
    }),
    postUsuariosValidarEmail: builder.mutation({
      query: (email) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/ValidarEmail?email=`,
        method: "POST",
        body: email,
      }),
    }),
    postUserUpdatePassword: builder.mutation({
      //   Objeto del body {password:""}
      query: (password) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/ActualizarContrasena`,
        method: "POST",
        body: password,
      }),
    }),
    postUserUnlock: builder.mutation({
      query: (idUser) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Activar?usuarioId=${idUser}`,
        method: "POST",
      }),
      invalidatesTags: ["usuarios"],
    }),
    postUserLock: builder.mutation({
      query: (idUser) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Desactivar?usuarioId=${idUser}`,
        method: "POST",
      }),
      invalidatesTags: ["usuarios"],
    }),
  }),
});
export const {
  useGetUsuariosQuery,
  useGetUsuariosPaginationMutation,
  useGetUsuariosRolesQuery,
  usePostUsuariosActualizarMutation,
  usePostUsuariosRegistrarMutation,
  usePostUserUnlockMutation,
  usePostUserLockMutation,
  useGetNumUsuariosMutation,
} = usuariosApi;
