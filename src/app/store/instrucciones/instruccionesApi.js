import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instruccionesApi = createApi({
  reducerPath: "instrucciones",
  tagTypes: ["instruccionesDef"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net",
  }),
  endpoints: (builder) => ({
    // GET QUERY //
    getGlosa: builder.query({
      query: () => "/Glosa",
    }),
    getInstrucciones: builder.query({
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Folio=0&Acreedor=${id}&MontoNeto=10&EstadoEmision=No Facturado`,
    }),
    getDeudorDocument: builder.query({
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Deudor=${id}&MontoNeto=10&Folio=0&PageIndex=1&PageSize=5000`,
    }),
    getAcreedorDocument: builder.query({
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Acreedor=${id}&MontoNeto=10&EstadoPago=No Pagado&conFolio=si&PageIndex=1&PageSize=5000`,
    }),
    getInstruccionesSpec: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.InicioPeriodo != undefined
              ? `&InicioPeriodo=${data.spec.InicioPeriodo}`
              : "") +
            (data.spec.TerminoPeriodo != undefined
              ? `&TerminoPeriodo=${data.spec.TerminoPeriodo}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "") +
            (data.spec.OrderByNeto != undefined
              ? `&OrderByNeto=${data.spec.OrderByNeto}`
              : "") +
            (data.spec.OrderByBruto != undefined
              ? `&OrderByBruto=${data.spec.OrderByBruto}`
              : "") +
            (data.spec.OrderByFechaEmision != undefined
              ? `&OrderByFechaEmision=${data.spec.OrderByFechaEmision}`
              : "") +
            (data.spec.OrderByFechaPago != undefined
              ? `&OrderByFechaPago=${data.spec.OrderByFechaPago}`
              : "") +
            (data.spec.OrderByFechaCarta != undefined
              ? `&OrderByFechaCarta=${data.spec.OrderByFechaCarta}`
              : "") +
            (data.spec.OrderByFolio != undefined
              ? `&OrderByFolio=${data.spec.OrderByFolio}`
              : "")
          : `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`,
        method: "GET",
      }),
      providesTags: ["instruccionesDef"],
    }),
    getConcepto: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/ConceptFilter?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["concepto"],
    }),
    getCodRef: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/CodRefFilter?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["CodRef"],
    }),
    getCarta: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/CartaFilter?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["Carta"],
    }),

    getNombreAcreedor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameCreditor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameCreditor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreAcreedor"],
    }),
    getRutAcreedor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutCreditor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosRutCreditor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutAcreedor"],
    }),
    getNombreDeudor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameDebtor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreDeudor"],
    }),
    getRutDeudor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutDeudor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosRutDeudor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudor"],
    }),
    ///////////////////////
    // GET MUTATION //
    getInstruccionesSpecm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Pagada != undefined
              ? `&Pagada=${data.spec.Pagada}`
              : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.conFolio != undefined
              ? `&conFolio=${data.spec.conFolio}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.MontoNetoIgual != undefined
              ? `&MontoNetoIgual=${data.spec.MontoNetoIgual}`
              : "") +
            (data.spec.MontoBrutoIgual != undefined
              ? `&MontoBrutoIgual=${data.spec.MontoBrutoIgual}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.InicioPeriodo != undefined
              ? `&InicioPeriodo=${data.spec.InicioPeriodo}`
              : "") +
            (data.spec.TerminoPeriodo != undefined
              ? `&TerminoPeriodo=${data.spec.TerminoPeriodo}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "") +
            (data.spec.OrderByNeto != undefined
              ? `&OrderByNeto=${data.spec.OrderByNeto}`
              : "") +
            (data.spec.OrderByBruto != undefined
              ? `&OrderByBruto=${data.spec.OrderByBruto}`
              : "") +
            (data.spec.OrderByFechaEmision != undefined
              ? `&OrderByFechaEmision=${data.spec.OrderByFechaEmision}`
              : "") +
            (data.spec.OrderByFechaPago != undefined
              ? `&OrderByFechaPago=${data.spec.OrderByFechaPago}`
              : "") +
            (data.spec.OrderByFechaCarta != undefined
              ? `&OrderByFechaCarta=${data.spec.OrderByFechaCarta}`
              : "") +
            (data.spec.OrderByFolio != undefined
              ? `&OrderByFolio=${data.spec.OrderByFolio}`
              : "")
          : `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`,
        method: "GET",
      }),
      providesTags: ["instruccionesDef"],
    }),
    getConceptom: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/ConceptFilter?id=${data.id}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["conceptoMutation"],
    }),
    getFiltersCCC: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/GetFiltersCCC?id=${data.id}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/GetFiltersCCC?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["filters"],
    }),
    getCodRefm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CodRefFilter?id=${data.id}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["conceptoMutation"],
    }),
    getCartam: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CartaFilter?id=${data.id}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["conceptoMutation"],
    }),
    getNombreAcreedorm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameCreditor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/sFiltrosNameCreditor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreAcreedorMutation"],
    }),
    getRutAcreedorm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutCreditor?id=${data.id}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/sFiltrosRutCreditor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutAcreedorMutation"],
    }),
    getNombreDeudorm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameDebtor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreDeudorMutation"],
    }),
    getRutDeudorm: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutDeudor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "") +
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "") +
            (data.spec.CodigoRef != undefined
              ? `&CodigoRef=${data.spec.CodigoRef}`
              : "")
          : `/sFiltrosRutDeudor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    ///////////////////////
    // PATCH MUTATION //
    patchInstruccionesSpec: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url:
          `/api/Instrucciones?id=${data.id}` +
          `&Editor=${data.spec.Editor}` +
          // `&EstadoEmision=${data.spec.EstadoEmision}`+
          // `&EstadoRecepcion=${data.spec.EstadoRecepcion}`+
          // `&EstadoPago=${data.spec.EstadoPago}`+
          // `&EstadoAceptacion=${data.spec.EstadoAceptacion}`+
          `&FechaEmision=${data.spec.FechaEmision}` +
          `&FechaRecepcion=${data.spec.FechaRecepcion}` +
          `&FechaPago=${data.spec.FechaPago}` +
          `&FechaAceptacion=${data.spec.FechaAceptacion}` +
          `&TipoInstructions=${data.spec.TipoInstructions}` +
          `&Folio=${data.spec.Folio}`,
        // (data.spec.Editor != undefined ? `&Editor=${data.spec.Editor}` : {}) +
        // (data.spec.EstadoEmision != undefined
        //   ? `&EstadoEmision=${data.spec.EstadoEmision}`
        //   : {}) +
        // (data.spec.EstadoRecepcion != undefined
        //   ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
        //   : {}) +
        // (data.spec.EstadoPago != undefined
        //   ? `&EstadoPago=${data.spec.EstadoPago}`
        //   : {}) +
        // (data.spec.EstadoAceptacion != undefined
        //   ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
        //   : {}) +
        // (data.spec.FechaEmision != undefined
        //   ? `&FechaEmision=${data.spec.FechaEmision}`
        //   : {}) +
        // (data.spec.FechaRecepcion != undefined
        //   ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
        //   : {}) +
        // (data.spec.FechaPago != undefined
        //   ? `&FechaPago=${data.spec.FechaPago}`
        //   : {}) +
        // (data.spec.FechaAceptacion != undefined
        //   ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
        //   : {}) +
        // (data.spec.TipoInstructions != undefined
        //   ? `&TipoInstructions=${data.spec.TipoInstructions}`
        //   : {}) +
        // (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : ""),
        method: "PATCH",
      }),
    }),
    ///////////////////////
    // POST MUTATION //
    postFacturacionAcreedor: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Instrucciones/CuadreMasivoAcreedor?id=${data.id}&excelName=${data.excelName}`,
        body: data.body,
        method: "POST",
      }),
    }),
    postFacturacionDeudor: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Instrucciones/ActualizarFacDeudor?id=${data.id}&excelName=${data.excelName}`,
        body: data.body,
        method: "POST",
      }),
    }),
    postFacturacion: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Instrucciones/FacturacionMasiva?id=${data.id}&erp=${data.erp}&excelName=${data.excelName}`,
        body: data.body,
        method: "POST",
      }),
    }),
    postNominasPago: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Instrucciones/NominasDePago?id=${data.id}&bank=${data.bank}&fechaPago=${data.fechaPago}&excelName=${data.excelName}`,
        body: data.body,
        method: "POST",
      }),
    }),
    postFacturacionCl: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Instrucciones/FacturacionCL?id=${data.id}`,
        body: data.body,
        method: "POST",
      }),
    }),
    ///////////////////////
    //CONTADORES SOLUCION DE CARGA TEMPORAL
    getNumberConcept: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingConcept?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumFilter: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/NumberFilter?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/NumberFilter?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["cantidadFiltros"],
    }),
    getNumberCodRef: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingCodRef?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumberCarta: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingCarta?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumberRutAcreedor: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingRutAcreedor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumberRutDeudor: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingRutDeudor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumberNombreAcreedor: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingNombreAcreedor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    getNumberNombreDeudor: builder.mutation({
      query: (data) => ({
        url: data.spec
          ? `/CountingNombreDeudor?id=${data.id}` +
            (data.spec.FechaEmision != undefined
              ? `&FechaEmision=${data.spec.FechaEmision}`
              : "") +
            (data.spec.FechaRecepcion != undefined
              ? `&FechaRecepcion=${data.spec.FechaRecepcion}`
              : "") +
            (data.spec.FechaPago != undefined
              ? `&FechaPago=${data.spec.FechaPago}`
              : "") +
            (data.spec.FechaAceptacion != undefined
              ? `&FechaAceptacion=${data.spec.FechaAceptacion}`
              : "") +
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "") +
            (data.spec.Concepto != undefined
              ? `&Concepto=${data.spec.Concepto}`
              : "") +
            (data.spec.EstadoAceptacion != undefined
              ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}`
              : "") +
            (data.spec.EstadoRecepcion != undefined
              ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}`
              : "") +
            (data.spec.Acreedor != undefined
              ? `&Acreedor=${data.spec.Acreedor}`
              : "") +
            (data.spec.Deudor != undefined
              ? `&Deudor=${data.spec.Deudor}`
              : "") +
            (data.spec.MontoNeto != undefined
              ? `&MontoNeto=${data.spec.MontoNeto}`
              : "") +
            (data.spec.MontoBruto != undefined
              ? `&MontoBruto=${data.spec.MontoBruto}`
              : "") +
            (data.spec.EstadoEmision != undefined
              ? `&EstadoEmision=${data.spec.EstadoEmision}`
              : "") +
            (data.spec.EstadoPago != undefined
              ? `&EstadoPago=${data.spec.EstadoPago}`
              : "") +
            (data.spec.RutAcreedor != undefined
              ? `&RutAcreedor=${data.spec.RutAcreedor}`
              : "") +
            (data.spec.RutDeudor != undefined
              ? `&RutDeudor=${data.spec.RutDeudor}`
              : "") +
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "") +
            (data.spec.NombreAcreedor != undefined
              ? `&NombreAcreedor=${data.spec.NombreAcreedor}`
              : "") +
            (data.spec.NombreDeudor != undefined
              ? `&NombreDeudor=${data.spec.NombreDeudor}`
              : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudorMutation"],
    }),
    //Mejoras
    getAllInstructions: builder.mutation({
      query: (data) => ({
        url: `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`,
        method: "GET",
      }),
      providesTags: ["instruccionesDefAll"],
    }),
  }),
});
export const {
  useGetGlosaQuery,
  useGetInstruccionesQuery,
  useGetAcreedorDocumentQuery,
  useGetDeudorDocumentQuery,
  useGetInstruccionesSpecmMutation,
  useGetInstruccionesSpecQuery,
  useGetConceptoQuery,
  useGetNombreAcreedorQuery,
  useGetRutAcreedorQuery,
  useGetNombreDeudorQuery,
  useGetRutDeudorQuery,
  usePatchInstruccionesSpecMutation,
  useGetConceptomMutation,
  useGetCodRefmMutation,
  useGetCartamMutation,
  useGetRutDeudormMutation,
  useGetRutAcreedormMutation,
  useGetNombreDeudormMutation,
  useGetNombreAcreedormMutation,
  usePostFacturacionDeudorMutation,
  usePostFacturacionAcreedorMutation,
  usePostFacturacionMutation,
  usePostNominasPagoMutation,
  usePostFacturacionClMutation,
  useGetCodRefQuery,
  useGetCartaQuery,
  useGetNumberConceptMutation,
  useGetNumberCodRefMutation,
  useGetNumberCartaMutation,
  useGetNumberRutAcreedorMutation,
  useGetNumberRutDeudorMutation,
  useGetNumberNombreAcreedorMutation,
  useGetNumberNombreDeudorMutation,
  useGetNumFilterMutation,
  useGetFiltersCCCMutation,
  //Mejoras
  useGetAllInstructionsMutation,
} = instruccionesApi;
