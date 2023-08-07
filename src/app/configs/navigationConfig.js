import i18next from "i18next";
import authRoles from "../auth/authRoles";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "administracion", 
    title: "Administración",
    subtitle: "Trigonos Energy",
    type: "group",
    icon: "heroicons-outline:user",
    translate: "ADMINISTRACIÓN",
    auth: authRoles.admin,
    children: [
      {
        id: "administracion.GestionPerfiles",
        title: "Gestión de Perfiles",
        type: "item",
        icon: "heroicons-outline:shield-exclamation",
        url: "/administracion/CreateProfile",
        auth: ["Trabajadores Prisma"],
      },
      
      {
        id: "administracion.GestionUsuarios",
        title: "Gestión Usuarios",
        type: "collapse",
        icon: "heroicons-outline:user-group",
        children: [
          {
            id: "GestionUsuarios.crearUsuario",
            title: "Agregar Usuarios",
            type: "item",
            icon: "heroicons-outline:user-add",
            url: "/administracion/CreateUser",
          },
          {
            id: "GestionUsuarios.EditarUsuarios",
            title: "Lista y Edición de Usuarios",
            type: "item",
            icon: "heroicons-outline:pencil-alt",
            url: "/administracion/EditUserApp",
          },
          
         
        ],
      },
      
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Trigonos Energy",
    type: "group",
    icon: "heroicons-outline:chart-bar",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.Analitica",
        title: "Analisis",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/analisis/Acusete",
      },
      
    ],
  },
  {
    id: "c1",
    title: "COMERCIAL",
    subtitle: "Modulo de Gestion Comercial",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
    
      {
        id: "c1.Participants",
        title: "Gestión Participantes",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/comercial/Participantesv2",
      },
      // {
      //   id: "example-component",
      //   title: "Example",
      //   translate: "EXAMPLE",
      //   type: "item",
      //   icon: "heroicons-outline:star",
      //   url: "example",
      // },
      {
        id: "c1.facturacion",
        title: "Facturación",
        type: "collapse",
        icon: "heroicons-outline:calculator",
        children: [
          {
            id: "c1.facturacion.EstadoFacturacion",
            title: "Estado Facturación",
            type: "item",
            icon: "heroicons-outline:clipboard-check",
            url: "/comercial/estadoFacturacion",
          },
          {
            id: "c1.facturacion.NominaPago",
            title: "Nominas de Pago",
            type: "item",
            icon: "heroicons-outline:clipboard-list",
            url: "/comercial/nominaPago",
            auth: authRoles.admin, //Es una prueba
          },
          {
            id: "c1.facturacion.FacturacionMasiva",
            title: "Facturación Masiva",
            type: "item",
            icon: "heroicons-outline:document-report",
            url: "/comercial/facturacionMasiva",
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
