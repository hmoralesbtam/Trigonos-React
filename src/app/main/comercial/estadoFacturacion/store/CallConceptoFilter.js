import React from "react";
import axios from "axios";
/*import dayjs from "dayjs";*/
let prueba = [];
const idProyecto = window.localStorage.getItem("ProyectUser");
export const CallConceptoFilter = async (id = idProyecto, data, filters) => {
  let url = "";
  // let acreedorid = "";
  // let deudorid = "";
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
  };
  if (filters.sRut != null) {
    if (data.acreedor == true) {
      params.rutAcreedor = filters.sRut.slice(0, 8);
    }

    if (data.deudor == true) {
      params.rutDeudor = filters.sRut.slice(0, 8);
    }
  }
  if (filters.sConcept != null) {
    params.glosa = filters.sConcept;
  }
  if (filters.sMontoNeto != null) {
    params.montoNeto = filters.sMontoNeto;
  }
  if (filters.sMontoBruto != null) {
    params.montoBruto = filters.sMontoBruto;
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
     https://trigonosapi.azurewebsites.net/ssFiltros?id=${id}&FechaEmision=${params.fechaEmision}&FechaRecepcion=${params.fechaRecepcion}&` +
    `FechaPago=${params.fechaPago}&FechaAceptacion=${params.fechaAceptacion}&Glosa=${params.glosa}&Concepto=${params.concepto}&EstadoAceptacion=${params.estadoAceptacion}&` +
    `EstadoRecepcion=${params.estadoRecepcion}&Acreedor=${params.acreedorId}&Deudor=${params.deudorId}&MontoNeto=${params.montoNeto}&MontoBruto=${params.montoBruto}&EstadoEmision=${params.estadoEmision}&` +
    `EstadoPago=${params.estadoPago}&RutAcreedor=${params.rutAcreedor}&RutDeudor=${params.rutDeudor}&Folio=${params.folio}&NombreAcreedor=${params.nombreAcreedor}&NombreDeudor=${params.nombreDeudor}`;
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
