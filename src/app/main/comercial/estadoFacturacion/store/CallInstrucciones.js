/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import React from "react";
import axios from "axios";
/*import dayjs from "dayjs";*/
let prueba = [];
// eslint-disable-next-line import/prefer-default-export
export const CallInstrucciones = async (
  PageIndex = 1,
  PageSize = 10,
  id = 1444,
  data,
  filters,
  orderByList
) => {
  let url = "";
  let params = {
    acreedorId: "",
    deudorId: "",
    fechaEmision: "",
    fechaRecepcion: "",
    fechaPago: "",
    fechaAceptacion: "",
    glosa: "",
    concepto: "",
    estadoAceptacion: "",
    estadoRecepcion: "",
    montoNeto: "",
    montoBruto: "",
    estadoEmision: "",
    estadoPago: "",
    rutAcreedor: "",
    rutDeudor: "",
    folio: "",
    nombreAcreedor: "",
    nombreDeudor: "",
    inicioPeriodo: "",
    terminoPeriodo: "",
    carta: "",
    codigoReferencia: "",
    OrderByNeto: "",
    OrderByBruto: "",
    OrderByFechaEmision: "",
    OrderByFechaPago: "",
    OrderByFechaCarta: "",
    OrderByFolio: "",
  };
  // params.OrderByNeto = "";
  // params.OrderByBruto = "";
  // params.OrderByFechaEmision = "";
  // params.OrderByFechaPago = "";
  // params.OrderByFechaCarta = "";

  if (filters.sInicioPeriodo != "" && filters.sInicioPeriodo != undefined) {
    params.inicioPeriodo = `20${filters.sInicioPeriodo
      .getYear()
      .toString()
      .slice(1, 3)}/${filters.sInicioPeriodo.getMonth() + 1}/01`;
  }
  if (filters.sTerminoPeriodo != "" && filters.sTerminoPeriodo != undefined) {
    params.terminoPeriodo = `20${filters.sTerminoPeriodo
      .getYear()
      .toString()
      .slice(1, 3)}/${filters.sTerminoPeriodo.getMonth() + 1}/01`;
  }
  if (filters.sRut != null) {
    if (data.acreedor == true) {
      params.rutDeudor = filters.sRut.slice(0, 8);
    }
    if (data.deudor == true) {
      params.rutAcreedor = filters.sRut.slice(0, 8);
    }
  }
  if (filters.sConcept != null) {
    params.glosa = filters.sConcept;
  }

  if (orderByList.orderByBruto != null) {
    params.OrderByBruto = orderByList.orderByBruto;
  }
  if (orderByList.orderByNeto != null) {
    params.OrderByNeto = orderByList.orderByNeto;
  }
  if (orderByList.orderByFechaEmision != null) {
    params.OrderByFechaEmision = orderByList.orderByFechaEmision;
  }
  if (orderByList.orderByFechaPago != null) {
    params.OrderByFechaPago = orderByList.orderByFechaPago;
  }
  if (orderByList.orderByFechaCarta != null) {
    params.OrderByFechaCarta = orderByList.orderByFechaCarta;
  }
  if (orderByList.orderByFolio != null) {
    params.OrderByFolio = orderByList.orderByFolio;
  }
  if (filters.sMontoNeto != null) {
    params.montoNeto = filters.sMontoNeto;
  }
  if (filters.sMontoBruto != null) {
    params.montoBruto = filters.sMontoBruto;
  }
  if (filters.sCarta != null) {
    params.carta = filters.sCarta;
  }
  if (filters.sCodRef != null) {
    params.codigoReferencia = filters.sCodRef;
  }

  if (filters.sFolio != null) {
    params.folio = filters.sFolio;
  }
  if (filters.sBusinessName != null) {
    if (data.acreedor == true) {
      params.nombreDeudor = filters.sBusinessName;
    }

    if (data.deudor == true) {
      params.nombreAcreedor = filters.sBusinessName;
    }
  }
  if (data.acreedor == true) {
    params.acreedorId = id;
  }
  if (data.deudor == true) {
    params.deudorId = id;
  }
  if (data.estadoPago == true) {
    params.estadoPago = "Pagado";
  }
  if (data.estadoEmision == true) {
    params.estadoEmision = "Facturado";
  }
  if (data.estadoRecepcion == true) {
    params.estadoRecepcion = "Recepcionado";
  }
  if (data.estadoAceptacion == true) {
    params.estadoAceptacion = "Aceptado";
  }

  url =
    `
     https://trigonosapi.azurewebsites.net/api/Instrucciones/InstruccionesDef/${id}?FechaEmision=${params.fechaEmision}&FechaRecepcion=${params.fechaRecepcion}&` +
    `FechaPago=${params.fechaPago}&FechaAceptacion=${params.fechaAceptacion}&Glosa=${params.glosa}&Concepto=${params.concepto}&EstadoAceptacion=${params.estadoAceptacion}&` +
    `EstadoRecepcion=${params.estadoRecepcion}&Acreedor=${params.acreedorId}&Deudor=${params.deudorId}&MontoNeto=${params.montoNeto}&MontoBruto=${params.montoBruto}&EstadoEmision=${params.estadoEmision}&` +
    `EstadoPago=${params.estadoPago}&RutAcreedor=${params.rutAcreedor}&RutDeudor=${params.rutDeudor}&Folio=${params.folio}&NombreAcreedor=${params.nombreAcreedor}&NombreDeudor=${params.nombreDeudor}&` +
    `PageIndex=${PageIndex}&PageSize=${PageSize}&InicioPeriodo=${params.inicioPeriodo}&TerminoPeriodo=${params.terminoPeriodo}&Carta=${params.carta}&CodigoRef=${params.codigoReferencia}&OrderByNeto=${params.OrderByNeto}&OrderByBruto=${params.OrderByBruto}` +
    `&OrderByFechaEmision=${params.OrderByFechaEmision}&OrderByFechaPago=${params.OrderByFechaPago}&OrderByFechaCarta=${params.OrderByFechaCarta}&OrderByFolio=${params.OrderByFolio}`;
  if (id === 1444) {
    return prueba;
  } else {
    await axios
      .get(url)
      .then((res) => {
        prueba = res.data;
      })
      .catch(({ code }) => {
        prueba = code;
      });
  }
  return prueba;
};
