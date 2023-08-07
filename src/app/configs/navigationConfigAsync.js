import i18next from "i18next";
import authRoles from "../auth/authRoles";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);




export function navigationConfigAsync (item =[],data =[]){
 //id de paginas
  // const idMiPerfil = 3;
  const idAgregarUsuario = 5;
  const idEditarUsuarios= 6;
  const idGestionPerfiles = 7;
  const idGestionParticipant = 8;
  const idEstFacturacion = 9;
  const idNominaPago = 10;
  const idFactMasiva= 11;
  const idGestDocumental= 13;

  // ParticipantsAppConfig(getListRoles(8)),
  // EstadoFacturacionAppConfig(getListRoles(9)),
  // ParticipantesAppConfig(getListRoles(8)),
  // NominaPagoAppConfig(getListRoles(10)),
  // FacturacionMasivaAppConfig(getListRoles(11)),



  // console.log(item)
  function getListRoles(idPagina){
    return (data.filter(
      (item) => item.idpagina=== idPagina
    )).map(function(el) {
      return el.nombreRol         
    });
  }

  let authGestUsuarios= data.filter(
                (item) => [idAgregarUsuario,idEditarUsuarios]
                .includes(item.idpagina))
                .map(function(el) {
                return el.nombreRol         
              });
  let authGestFacturacion= data.filter(
                (item) => [idEstFacturacion,idNominaPago,idFactMasiva]
                .includes(item.idpagina))
                .map(function(el) {
                return el.nombreRol         
              });
  

    const Config =[
        {
          id: "1", 
          title: "Administración",
          subtitle: "Trigonos Energy",
          type: "group",
          icon: "heroicons-outline:user",
          translate: "ADMINISTRACIÓN",
          auth: item,
          children: [
            {
              id: "1.1",
              title: "Gestión de Perfiles",
              type: "item",
              icon: "heroicons-outline:shield-exclamation",
              url: "/administracion/CreateProfile",
              auth:getListRoles(idGestionPerfiles),
            },
            
            {
              id: "1.2",
              title: "Gestión Usuarios",
              type: "collapse",
              icon: "heroicons-outline:user-group",
              auth:authGestUsuarios,
              children: [
                {
                  id: "2.1",
                  title: "Agregar Usuarios",
                  type: "item",
                  icon: "heroicons-outline:user-add",
                  url: "/administracion/CreateUser",
                  auth:getListRoles(idAgregarUsuario),
                },
                {
                  id: "2.2",
                  title: "Lista y Edición de Usuarios",
                  type: "item",
                  icon: "heroicons-outline:pencil-alt",
                  url: "/administracion/EditUserApp",
                  auth:getListRoles(idEditarUsuarios),

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
          id: "2",
          title: "COMERCIAL",
          subtitle: "Modulo de Gestion Comercial",
          type: "group",
          icon: "heroicons-outline:home",
          
          children: [
          
            {
              id: "2.1",
              title: "Gestión Participantes",
              type: "item",
              icon: "heroicons-outline:clipboard-check",
              url: "/comercial/Participantesv2",
              auth: getListRoles(idGestionParticipant)
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
              id: "2.2",
              title: "Facturación",
              type: "collapse",
              icon: "heroicons-outline:calculator",
              auth:authGestFacturacion,
              children: [
                {
                  id: "2.2.1",
                  title: "Estado Facturación",
                  type: "item",
                  icon: "heroicons-outline:clipboard-check",
                  url: "/comercial/estadoFacturacionV2",
                  auth:getListRoles(idEstFacturacion)
                },
                {
                  id: "2.2.2",
                  title: "Nominas de Pago",
                  type: "item",
                  icon: "heroicons-outline:clipboard-list",
                  url: "/comercial/nominaPago",
                  auth:getListRoles(idNominaPago)

                },
                {
                  id: "2.2.3",
                  title: "Facturación Masiva",
                  type: "item",
                  icon: "heroicons-outline:document-report",
                  url: "/comercial/facturacionMasiva",
                  auth:getListRoles(idFactMasiva)
                },
              ],
            },
            // {
            //   id: "4.4",
            //   title: "TEST",
            //   type: "item",
            //   icon: "heroicons-outline:clipboard-check",
            //   url: "/comercial/estadoFacturacionV2",
            //   auth: getListRoles(idEstFacturacion)
            // },
          ],
        },
        {
          id: "3",
          title: "GESTIÓN",
          subtitle: "Modulo de Gestión",
          type: "group",
          icon: "heroicons-outline:home",
          
          children: [
          
            {
              id: "3.1",
              title: "Gestión Documental",
              type: "item",
              icon: "heroicons-outline:clipboard-check",
              url: "/gestion/documental",
              auth: getListRoles(idGestDocumental)
            },
           
          ],
        },
        // {
        //   id: "4",
        //   title: "USUARIO",
        //   subtitle: "USUARIO",
        //   type: "group",
        //   icon: "heroicons-outline:home",
          
        //   children: [
          
        //     {
        //       id: "4.1",
        //       title: "",
        //       type: "item",
        //       icon: "heroicons-outline:clipboard-check",
        //       url: "/sign-out/SignOutPage",
        //       auth: []
        //     },
           
        //   ],
        // },
      ];
  return Config
  }


// const navigationConfig = [
//   {
//     id: "administracion", 
//     title: "Administración",
//     subtitle: "Trigonos Energy",
//     type: "group",
//     icon: "heroicons-outline:user",
//     translate: "ADMINISTRACIÓN",
//     auth: authRoles.admin,
//     children: [
//       {
//         id: "administracion.GestionPerfiles",
//         title: "Gestión de Perfiles",
//         type: "item",
//         icon: "heroicons-outline:shield-exclamation",
//         url: "/administracion/CreateProfile",
//         auth: ["Trabajadores Prisma"],
//       },
      
//       {
//         id: "administracion.GestionUsuarios",
//         title: "Gestión Usuarios",
//         type: "collapse",
//         icon: "heroicons-outline:user-group",
//         children: [
//           {
//             id: "GestionUsuarios.crearUsuario",
//             title: "Agregar Usuarios",
//             type: "item",
//             icon: "heroicons-outline:user-add",
//             url: "/administracion/CreateUser",
//           },
//           {
//             id: "GestionUsuarios.EditarUsuarios",
//             title: "Lista y Edición de Usuarios",
//             type: "item",
//             icon: "heroicons-outline:pencil-alt",
//             url: "/administracion/EditUserApp",
//           },
          
         
//         ],
//       },
      
//     ],
//   },
//   {
//     id: "dashboards",
//     title: "Dashboards",
//     subtitle: "Trigonos Energy",
//     type: "group",
//     icon: "heroicons-outline:chart-bar",
//     translate: "DASHBOARDS",
//     children: [
//       {
//         id: "dashboards.Analitica",
//         title: "Analisis",
//         type: "item",
//         icon: "heroicons-outline:clipboard-check",
//         url: "/analisis/Acusete",
//       },
      
//     ],
//   },
//   {
//     id: "c1",
//     title: "COMERCIAL",
//     subtitle: "Modulo de Gestion Comercial",
//     type: "group",
//     icon: "heroicons-outline:home",
//     children: [
    
//       {
//         id: "c1.Participants",
//         title: "Gestión Participantes",
//         type: "item",
//         icon: "heroicons-outline:clipboard-check",
//         url: "/comercial/Participantesv2",
//       },
//       // {
//       //   id: "example-component",
//       //   title: "Example",
//       //   translate: "EXAMPLE",
//       //   type: "item",
//       //   icon: "heroicons-outline:star",
//       //   url: "example",
//       // },
//       {
//         id: "c1.facturacion",
//         title: "Facturación",
//         type: "collapse",
//         icon: "heroicons-outline:calculator",
//         children: [
//           {
//             id: "c1.facturacion.EstadoFacturacion",
//             title: "Estado Facturación",
//             type: "item",
//             icon: "heroicons-outline:clipboard-check",
//             url: "/comercial/estadoFacturacion",
//           },
//           {
//             id: "c1.facturacion.NominaPago",
//             title: "Nominas de Pago",
//             type: "item",
//             icon: "heroicons-outline:clipboard-list",
//             url: "/comercial/nominaPago",
//             auth: authRoles.admin, //Es una prueba
//           },
//           {
//             id: "c1.facturacion.FacturacionMasiva",
//             title: "Facturación Masiva",
//             type: "item",
//             icon: "heroicons-outline:document-report",
//             url: "/comercial/facturacionMasiva",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default navigationConfig;
