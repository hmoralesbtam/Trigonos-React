//ORDENAR CODIGO

import * as React from "react";
import axios from "axios";
// import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
import TablaUltimosCambios from "./widgets/TablaUltimosCambios";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Paper from "@mui/material/Paper";
import { CallBanks } from "../store/CallBanks";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import TablaHistorificacion from "./TablaHistorificacion";
import AlertCambios from "./widgets/AlertCambios";
import AdviceModule from "../../AdviceModule";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useGetProyectoByIdMutation,
  usePatchPartcipantMutation,
  usePostActualizarProyectoMutation,
  useRefetchQueriesPartMutation,
} from "app/store/participantesApi/participantesApi";
import {
  usePostFacturaAgregarMutation,
  useGetFacturaByIdMutation,
  usePostFacturaActualizarMutation,
  useRefetchQueriesFactMutation,
} from "app/store/facturacionClApi/facturacionClApi";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TablaAgentes from "./TablaAgentes";
//MODAL TABLA CAMBIOS
function createData(campo, antiguo, nuevo) {
  return { campo, antiguo, nuevo };
}

let rows = [];
let rowsGestTrigonos = [];

const steps = [
  "Coordinado",
  "Datos de Contacto",
  "Datos Bancarios",
  "Agentes",
  "Gestión Trígonos",
  "Historificación",
];
const iconSteps = [
  <LockOpenIcon />,
  <ManageAccountsIcon />,
  <AssignmentIcon />,
  <AccountBalanceIcon />,
  <ManageHistoryIcon />,
];
let LabelSetep = "";
let dataBank;
let banks;

export default function HorizontalNonLinearStepper(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  
  const { msgResp, msgText, msgError } = MsgAlert;
  const [ren, setRen] = useState(0);
  const [postActProyect, dataActProyect] = usePostActualizarProyectoMutation();
  const [postAddFactCl, dataAddFactCl] = usePostFacturaAgregarMutation();
  const [postActFactCl, dataActFactCl] = usePostFacturaActualizarMutation();
  const [patchActPart, dataActPart] = usePatchPartcipantMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [activeLabel, setActiveLabel] = useState("");
  const [grupo, setGrupo] = useState("");

  const [bankk, setBankk] = useState("");
  const [checkPrueba, setCheckPrueba] = useState(false); //este proviene de una prop pHabilitado
  const [checkProduccion, setCheckProduccion] = useState(false); //este proviene de una prop pHabilitado
  //formStateProjects es para actualizar datos de la tabla de proyectos tiene su data confirm
  const [formStateFactCl, setformStateFactCl] = useState({
    fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : undefined,
    fact_userProduccion: props.fullData.dataFactCl.usuario64
      ? props.fullData.dataFactCl.usuario64
      : undefined,
    fact_claveProduccion: props.fullData.dataFactCl.clave64
      ? props.fullData.dataFactCl.clave64
      : undefined,
    fact_rutProduccion: props.fullData.dataFactCl.ruT64
      ? props.fullData.dataFactCl.ruT64
      : undefined,
    fact_userPruebas: props.fullData.dataFactCl.usuarioTest
      ? props.fullData.dataFactCl.usuarioTest
      : undefined,
    fact_clavePruebas: props.fullData.dataFactCl.claveTest
      ? props.fullData.dataFactCl.claveTest
      : undefined,
    fact_rutPruebas: props.fullData.dataFactCl.rutTest
      ? props.fullData.dataFactCl.rutTest
      : undefined,
  });
  const [dataconfirmFactCl, setDataconfirmFactCl] = useState({
    fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : undefined,
    fact_userProduccion: props.fullData.dataFactCl.usuario64
      ? props.fullData.dataFactCl.usuario64
      : undefined,
    fact_claveProduccion: props.fullData.dataFactCl.clave64
      ? props.fullData.dataFactCl.clave64
      : undefined,
    fact_rutProduccion: props.fullData.dataFactCl.ruT64
      ? props.fullData.dataFactCl.ruT64
      : undefined,
    fact_userPruebas: props.fullData.dataFactCl.usuarioTest
      ? props.fullData.dataFactCl.usuarioTest
      : undefined,
    fact_clavePruebas: props.fullData.dataFactCl.claveTest
      ? props.fullData.dataFactCl.claveTest
      : undefined,
    fact_rutPruebas: props.fullData.dataFactCl.rutTest
      ? props.fullData.dataFactCl.rutTest
      : undefined,
  });
  //formStateFactCl es para actualizar datos de la tabla de [REACT_TRGNS_FACTCLDATA]
  const [formStateProjects, setformStateProjects] = useState({
    erp: props.fullData.dataProject.erp,
    id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
    isclient: props.fullData.dataProject.vHabilitado,
  });
  const [dataconfirmProjects, setDataconfirmProjects] = useState({
    erp: props.fullData.dataProject.erp,
    id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
    isclient: props.fullData.dataProject.vHabilitado,
  });
  //formState es para actualizar datos de la tabla de participantes
  const [formState, setFormState] = useState({
    dataParticipant:{
      id: props.fullData.dataParticipant.id,
      name: props.fullData.dataParticipant.name,
      rut: props.fullData.dataParticipant.rut,
      verificationCode: props.fullData.dataParticipant.verification_Code,
      businessName: props.fullData.dataParticipant.business_Name,
      commercialBusiness: props.fullData.dataParticipant.commercial_Business,
      email: props.fullData.dataParticipant.dte_Reception_Email,
      bankAccount: props.fullData.dataParticipant.bank_Account,
      bank: props.fullData.dataParticipant.bank,
      banksName: props.fullData.dataParticipant.banksName,
      commercialAddress: props.fullData.dataParticipant.commercial_address,
      postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
      manager: props.fullData.dataParticipant.manager,
      payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
      payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
      payContactAddress: props.fullData.dataParticipant.pay_contact_address,
      payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
      payContactEmail: props.fullData.dataParticipant.pay_contact_email,
      billsContactLastName:
        props.fullData.dataParticipant.bills_contact_last_name,
      billsContactFirstName:
        props.fullData.dataParticipant.bills_contact_first_name,
      billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
      billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
      billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
    },
    dataProject:{
      erp: props.fullData.dataProject.erp,
      id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
      isclient: props.fullData.dataProject.vHabilitado,
    },
    dataFactCl:{
      fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : "Vacio",
      fact_userProduccion: props.fullData.dataFactCl.usuario64
        ? props.fullData.dataFactCl.usuario64
        : "Vacio",
      fact_claveProduccion: props.fullData.dataFactCl.clave64
        ? props.fullData.dataFactCl.clave64
        : "Vacio",
      fact_rutProduccion: props.fullData.dataFactCl.ruT64
        ? props.fullData.dataFactCl.ruT64
        : "Vacio",
      fact_userPruebas: props.fullData.dataFactCl.usuarioTest
        ? props.fullData.dataFactCl.usuarioTest
        : "Vacio",
      fact_clavePruebas: props.fullData.dataFactCl.claveTest
        ? props.fullData.dataFactCl.claveTest
        : "Vacio",
      fact_rutPruebas: props.fullData.dataFactCl.rutTest
        ? props.fullData.dataFactCl.rutTest
        : "Vacio",
    }

   
  });
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [update, setUpdate] = useState({
    rut: false,
    name: false,
    businessName: false,
    commercialBusiness: false,
    email: false,
    bankAccount: false,
    banksName: false,
    commercialAddress: false,
    manager: false,
    payContactFirstName: false,
    payContactPhones: false,
    payContactEmail: false,
    billsContactFirstName: false,
    billsContactPhones: false,
    billsContactEmail: false,
    erp: false,
    id_nomina_pago: false,
    typeClient: false,
    facturacioncl: false,
    fact_pHabilitado: false, //esta variable luego debe provenir del
    fact_userProduccion: false,
    fact_claveProduccion: false,
    fact_rutProduccion: false,
    fact_userPruebas: false,
    fact_clavePruebas: false,
    fact_rutPruebas: false,
  });
  const [dataConfirm, setDataConfirm] = useState({
    dataParticipant:{
      id: props.fullData.dataParticipant.id,
      name: props.fullData.dataParticipant.name,
      rut: props.fullData.dataParticipant.rut,
      verificationCode: props.fullData.dataParticipant.verification_Code,
      businessName: props.fullData.dataParticipant.business_Name,
      commercialBusiness: props.fullData.dataParticipant.commercial_Business,
      email: props.fullData.dataParticipant.dte_Reception_Email,
      bankAccount: props.fullData.dataParticipant.bank_Account,
      bank: props.fullData.dataParticipant.bank,
      banksName: props.fullData.dataParticipant.banksName,
      commercialAddress: props.fullData.dataParticipant.commercial_address,
      postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
      manager: props.fullData.dataParticipant.manager,
      payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
      payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
      payContactAddress: props.fullData.dataParticipant.pay_contact_address,
      payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
      payContactEmail: props.fullData.dataParticipant.pay_contact_email,
      billsContactLastName:
        props.fullData.dataParticipant.bills_contact_last_name,
      billsContactFirstName:
        props.fullData.dataParticipant.bills_contact_first_name,
      billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
      billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
      billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
    },
    dataProject:{
      erp: props.fullData.dataProject.erp,
      id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
      isclient: props.fullData.dataProject.vHabilitado,
    },
    dataFactCl:{
      fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : "Vacio",
      fact_userProduccion: props.fullData.dataFactCl.usuario64
        ? props.fullData.dataFactCl.usuario64
        : "Vacio",
      fact_claveProduccion: props.fullData.dataFactCl.clave64
        ? props.fullData.dataFactCl.clave64
        : "Vacio",
      fact_rutProduccion: props.fullData.dataFactCl.ruT64
        ? props.fullData.dataFactCl.ruT64
        : "Vacio",
      fact_userPruebas: props.fullData.dataFactCl.usuarioTest
        ? props.fullData.dataFactCl.usuarioTest
        : "Vacio",
      fact_clavePruebas: props.fullData.dataFactCl.claveTest
        ? props.fullData.dataFactCl.claveTest
        : "Vacio",
      fact_rutPruebas: props.fullData.dataFactCl.rutTest
        ? props.fullData.dataFactCl.rutTest
        : "Vacio",
    }
  });
  const [activeButton, setActiveButton] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [open, setOpen] = useState(false);

  const [checkedBlue, setCheckedBlue] = React.useState(false);
  const [checkedExt, setCheckedExt] = React.useState(false);
  const [refetchParticipant, dataPart] = useRefetchQueriesPartMutation();
  const [refetchFact, dataFact] = useRefetchQueriesFactMutation();
  const handleClickOpen = () => {
    //condiciones antes de enviar algo
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    let isEqualDataParticipant = JSON.stringify(dataConfirm.dataParticipant) === JSON.stringify(formState.dataParticipant);
    let isEqualFactCl = JSON.stringify(dataConfirm.dataFactCl) === JSON.stringify(formState.dataFactCl);
    let isEqualProject= JSON.stringify(dataConfirm.dataProject) === JSON.stringify(formState.dataProject);
    if (!isEqual) {

      console.log(dataConfirm.dataFactCl);
      console.log(formState.dataFactCl);
      if((formState.dataFactCl.fact_pHabilitado=== undefined && formState.dataProject.erp ===5)){
        console.log("Validar que no se envie vacio y que no sea igual al seleccionar facturacion.cl")
        setOpenDialog(true);
        setMsgAlert({
          msgResp: true,
          msgText: "Debe seleccionar un ambiente para Facturación.CL",
          msgError: true,
        });
        setTimeout(() => {
          // refetchParticipant();
          // refetchFact();
          setMsgAlert({
            msgResp: undefined,
            msgText: "",
            msgError: undefined,
          });
          setOpenDialog(false);
        }, 1500);
        
      }else if((formState.dataFactCl.fact_pHabilitado!== undefined && formState.dataProject.erp ===5)){
        

        if(formState.dataFactCl.fact_pHabilitado ){
          let isEqualUserPro = JSON.stringify(dataConfirm.dataFactCl.fact_userProduccion) === JSON.stringify(formState.dataFactCl.fact_userProduccion);
          let isEqualClavePro = JSON.stringify(dataConfirm.dataFactCl.fact_claveProduccion) === JSON.stringify(formState.dataFactCl.fact_claveProduccion);
          let isEqualRutPro = JSON.stringify(dataConfirm.dataFactCl.fact_rutProduccion) === JSON.stringify(formState.dataFactCl.fact_rutProduccion);
          if((formState.dataFactCl.fact_userProduccion==="Vacio") && (formState.dataFactCl.fact_claveProduccion==="Vacio") && (dataConfirm.dataFactCl.fact_rutProduccion=== "Vacio")){
            setOpenDialog(true);
            setMsgAlert({
              msgResp: true,
              msgText: "Debe completar uno de los campos de Producción",
              msgError: true,
            });
            setTimeout(() => {
              // refetchParticipant();
              // refetchFact();
              setMsgAlert({
                msgResp: undefined,
                msgText: "",
                msgError: undefined,
              });
              setOpenDialog(false);
            }, 1500);
          }else{
            setOpen(true);
          }

        }else{
          let isEqualUserTest = JSON.stringify(dataConfirm.dataFactCl.fact_userPruebas) === JSON.stringify(formState.dataFactCl.fact_userPruebas);
            let isEqualClaveTest = JSON.stringify(dataConfirm.dataFactCl.fact_clavePruebas) === JSON.stringify(formState.dataFactCl.fact_clavePruebas);
            let isEqualRutTest = JSON.stringify(dataConfirm.dataFactCl.fact_rutPruebas) === JSON.stringify(formState.dataFactCl.fact_rutPruebas);
            if((formState.dataFactCl.fact_userPruebas==="Vacio") && (formState.dataFactCl.fact_clavePruebas==="Vacio") && (formState.dataFactCl.fact_rutPruebas==="Vacio")){
              setOpenDialog(true);
              setMsgAlert({
                msgResp: true,
                msgText: "Debe completar uno de los campos de Testing",
                msgError: true,
              });
              setTimeout(() => {
                // refetchParticipant();
                // refetchFact();
                setMsgAlert({
                  msgResp: undefined,
                  msgText: "",
                  msgError: undefined,
                });
                setOpenDialog(false);
              }, 1500);
            }else{
                setOpen(true);
            }

        }
      }else{
        setOpen(true);
      }
     
    }
    
    else {

      setOpenDialog(true);
      setMsgAlert({
        msgResp: true,
        msgText: "Debe modificar algun campo",
        msgError: true,
      });
      setTimeout(() => {
        // refetchParticipant();
        // refetchFact();
        setMsgAlert({
          msgResp: undefined,
          msgText: "",
          msgError: undefined,
        });
        setOpenDialog(false);
      }, 1500);
    }
    // if (
    //   formStateProjects.erp === 5 &&
    //   JSON.stringify(dataconfirmFactCl) === JSON.stringify(formStateFactCl) &&
    //   props.fullData.dataFactCl.phabilitado === undefined
    // ) {
    //   setOpenDialog(true);
    //   setMsgAlert({
    //     msgResp: true,
    //     msgText: "Debe completar Facturación.CL",
    //     msgError: true,
    //   });
    //   setTimeout(() => {
    //     // refetchParticipant();
    //     // refetchFact();
    //     setMsgAlert({
    //       msgResp: undefined,
    //       msgText: "",
    //       msgError: undefined,
    //     });
    //     setOpenDialog(false);
    //   }, 1500);
    // } else {
      
    // }
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleCloseAlertSubmit = () => {
    ApiPatch();
    setOpen(false);
  };
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    // setFormState({
    //   ...formState,
    //     dataParticipant: {[name]: value, ...formState.dataParticipant,},
      
      
    // });
    setFormState(prevState => ({
      ...prevState,
      dataParticipant: {
        ...prevState.dataParticipant,
        [name]: value
      }
    }));
  };
  const onInputChangeFact = ({ target }) => {
    const { name, value } = target;
    setFormState(prevState => ({
      ...prevState,
      dataFactCl: {
        ...prevState.dataFactCl,
        [name]: value,
      
      }
    }));
    // setformStateFactCl({
    //   ...formStateFactCl,
    //   [name]: value,
    // });
  };
  function isOurClient(number) {
    if (number === 0) {
      setCheckedExt(true);
      setCheckedBlue(false);
    } else {
      setCheckedExt(false);
      setCheckedBlue(true);
    }
  }
  function haveFactCl(bool) {
    // console.log(bool)
    if (bool != undefined) {
      if (bool) {
        setCheckProduccion(true);
        setCheckPrueba(false);
      } else {
        setCheckProduccion(false);

        setCheckPrueba(true);
      }
    } else {
      setCheckProduccion(false);
      setCheckPrueba(false);
    }
  }

  useEffect(() => {
 

    (async () => {
      dataBank = await CallBanks(props.fullData.dataParticipant.bank);
      setBankk(dataBank.name);
      isOurClient(props.fullData.dataProject.vHabilitado);
      haveFactCl(props.fullData.dataFactCl.phabilitado);
      // console.log(props.fullData.dataFactCl.usuario64?props.fullData.dataFactCl.usuario64:"vacio" )
      setFormState({
        dataParticipant:{
          id: props.fullData.dataParticipant.id,
          name: props.fullData.dataParticipant.name,
          rut: props.fullData.dataParticipant.rut,
          verificationCode: props.fullData.dataParticipant.verification_Code,
          businessName: props.fullData.dataParticipant.business_Name,
          commercialBusiness: props.fullData.dataParticipant.commercial_Business,
          email: props.fullData.dataParticipant.dte_Reception_Email,
          bankAccount: props.fullData.dataParticipant.bank_Account,
          bank: props.fullData.dataParticipant.bank,
          banksName: props.fullData.dataParticipant.banksName,
          commercialAddress: props.fullData.dataParticipant.commercial_address,
          postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
          manager: props.fullData.dataParticipant.manager,
          payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
          payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
          payContactAddress: props.fullData.dataParticipant.pay_contact_address,
          // payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
          payContactPhones:
          props.fullData.dataParticipant.pay_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
          payContactEmail: props.fullData.dataParticipant.pay_contact_email,
          billsContactLastName:
            props.fullData.dataParticipant.bills_contact_last_name,
          billsContactFirstName:
            props.fullData.dataParticipant.bills_contact_first_name,
          billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
          // billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
          billsContactPhones:
          props.fullData.dataParticipant.bills_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
          billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
        },
        dataProject:{
          erp: props.fullData.dataProject.erp,
          id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
          isclient: props.fullData.dataProject.vHabilitado,
        },
        dataFactCl:{
          fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
          fact_userProduccion: props.fullData.dataFactCl.usuario64
            ? props.fullData.dataFactCl.usuario64
            : "Vacio",
          fact_claveProduccion: props.fullData.dataFactCl.clave64
            ? props.fullData.dataFactCl.clave64
            : "Vacio",
          fact_rutProduccion: props.fullData.dataFactCl.ruT64
            ? props.fullData.dataFactCl.ruT64
            : "Vacio",
          fact_userPruebas: props.fullData.dataFactCl.usuarioTest
            ? props.fullData.dataFactCl.usuarioTest
            : "Vacio",
          fact_clavePruebas: props.fullData.dataFactCl.claveTest
            ? props.fullData.dataFactCl.claveTest
            : "Vacio",
          fact_rutPruebas: props.fullData.dataFactCl.rutTest
            ? props.fullData.dataFactCl.rutTest
            : "Vacio",
        }
       
      });
      setDataConfirm({
        dataParticipant:{
          id: props.fullData.dataParticipant.id,
          name: props.fullData.dataParticipant.name,
          rut: props.fullData.dataParticipant.rut,
          verificationCode: props.fullData.dataParticipant.verification_Code,
          businessName: props.fullData.dataParticipant.business_Name,
          commercialBusiness: props.fullData.dataParticipant.commercial_Business,
          email: props.fullData.dataParticipant.dte_Reception_Email,
          bankAccount: props.fullData.dataParticipant.bank_Account,
          bank: props.fullData.dataParticipant.bank,
          banksName: props.fullData.dataParticipant.banksName,
          commercialAddress: props.fullData.dataParticipant.commercial_address,
          postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
          manager: props.fullData.dataParticipant.manager,
          payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
          payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
          payContactAddress: props.fullData.dataParticipant.pay_contact_address,
          // payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
          payContactPhones:
          props.fullData.dataParticipant.pay_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
          payContactEmail: props.fullData.dataParticipant.pay_contact_email,
          billsContactLastName:
            props.fullData.dataParticipant.bills_contact_last_name,
          billsContactFirstName:
            props.fullData.dataParticipant.bills_contact_first_name,
          billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
          // billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
          billsContactPhones:
          props.fullData.dataParticipant.bills_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
          billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
        },
        dataProject:{
          erp: props.fullData.dataProject.erp,
          id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
          isclient: props.fullData.dataProject.vHabilitado,
        },
        dataFactCl:{
          fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
          fact_userProduccion: props.fullData.dataFactCl.usuario64
            ? props.fullData.dataFactCl.usuario64
            : "Vacio",
          fact_claveProduccion: props.fullData.dataFactCl.clave64
            ? props.fullData.dataFactCl.clave64
            : "Vacio",
          fact_rutProduccion: props.fullData.dataFactCl.ruT64
            ? props.fullData.dataFactCl.ruT64
            : "Vacio",
          fact_userPruebas: props.fullData.dataFactCl.usuarioTest
            ? props.fullData.dataFactCl.usuarioTest
            : "Vacio",
          fact_clavePruebas: props.fullData.dataFactCl.claveTest
            ? props.fullData.dataFactCl.claveTest
            : "Vacio",
          fact_rutPruebas: props.fullData.dataFactCl.rutTest
            ? props.fullData.dataFactCl.rutTest
            : "Vacio",
        }
      });

      

     
    })();
  }, [props.fullData.dataParticipant.id, alertOk]);
  useEffect(() => {
    setOpenDialog(true);
    setMsgAlert({
      msgResp: true,
      msgText: "Debe seleccionar un ambiente para Facturación.CL",
      msgError: true,
    });
    (async () => {
      banks = await CallBanks(1, 2);
    })();
    isOurClient(props.fullData.dataProject.vHabilitado);
    haveFactCl(props.fullData.dataFactCl.phabilitado);
  }, []);
  useEffect(() => {
    if (alertOk === true) {
      setActiveButton(true);
      setTimeout(() => {
        setAlertOk(false);
        setActiveButton(false);
      }, 1000);
    }
    if (alertError === true) {
      setTimeout(() => {
        setAlertError(false);
      }, 1000);
    }
  }, [alertOk, alertError]);

  const {
    rut,
    name,
    businessName,
    commercialBusiness,
    email,
    bankAccount,
    banksName,
    commercialAddress,
    manager,
    payContactFirstName,
    payContactPhones,
    payContactEmail,
    billsContactFirstName,
    billsContactPhones,
    billsContactEmail,
    typeClient,
    facturacioncl,
    fact_userProduccion,
    fact_claveProduccion,
    fact_rutProduccion,
    fact_userPruebas,
    fact_clavePruebas,
    fact_rutPruebas,
    erp,
    id_nomina_pago,
  } = update;
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangee = (event) => {
    let idBank;
    banks.map((d) => {
      if (d.name === event.target.value) {
        idBank = d.id;
      }
    });

    // setFormState({
    //   ...formState,
    //   dataParticipant:{
    //     ...formState.dataParticipant,
    //     banksName: event.target.value,
    //     bank: idBank,
    //   }
    // });
    setFormState(prevState => ({
      ...prevState,
      dataParticipant: {
        ...prevState.dataParticipant,
        banksName: event.target.value,
        bank: idBank,
      }
    }));
    setBankk(event.target.value);
  };
  const handleChangeNomina = (event) => {
    // setformStateProjects({
    //   ...formStateProjects,
    //   id_nomina_pago: event.target.value,
    // });

    setFormState(prevState => ({
      ...prevState,
      dataProject: {
        ...prevState.dataProject,
        id_nomina_pago:event.target.value,
      
      }
    }));
  };
  const handleChangeERP = (event) => {
    // setformStateProjects({
    //   ...formStateProjects,
    //   erp: event.target.value,
    // });
    
    setFormState(prevState => ({
      ...prevState,
      dataProject: {
        ...prevState.dataProject,
        erp:event.target.value,
      
      }
    }));

    if (event.target.value === 5) {
      haveFactCl(props.fullData.dataFactCl.phabilitado);
      setUpdate({
        ...update,
        facturacioncl: false,
        fact_pHabilitado: props.fullData.dataFactCl.phabilitado,
        fact_userProduccion: false,
        fact_claveProduccion: false,
        fact_rutProduccion: false,
        fact_userPruebas: false,
        fact_clavePruebas: false,
        fact_rutPruebas: false,
      });
      setFormState(prevState => ({
        ...prevState,
        dataFactCl: {
          fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
          fact_userProduccion: props.fullData.dataFactCl.usuario64
            ? props.fullData.dataFactCl.usuario64
            : "Vacio",
          fact_claveProduccion: props.fullData.dataFactCl.clave64
            ? props.fullData.dataFactCl.clave64
            : "Vacio",
          fact_rutProduccion: props.fullData.dataFactCl.ruT64
            ? props.fullData.dataFactCl.ruT64
            : "Vacio",
          fact_userPruebas: props.fullData.dataFactCl.usuarioTest
            ? props.fullData.dataFactCl.usuarioTest
            : "Vacio",
          fact_clavePruebas: props.fullData.dataFactCl.claveTest
            ? props.fullData.dataFactCl.claveTest
            : "Vacio",
          fact_rutPruebas: props.fullData.dataFactCl.rutTest
            ? props.fullData.dataFactCl.rutTest
            : "Vacio",
        
        }
      }));
      setDataConfirm(prevState => ({
        ...prevState,
        dataFactCl: {
          fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
          fact_userProduccion: props.fullData.dataFactCl.usuario64
            ? props.fullData.dataFactCl.usuario64
            : "Vacio",
          fact_claveProduccion: props.fullData.dataFactCl.clave64
            ? props.fullData.dataFactCl.clave64
            : "Vacio",
          fact_rutProduccion: props.fullData.dataFactCl.ruT64
            ? props.fullData.dataFactCl.ruT64
            : "Vacio",
          fact_userPruebas: props.fullData.dataFactCl.usuarioTest
            ? props.fullData.dataFactCl.usuarioTest
            : "Vacio",
          fact_clavePruebas: props.fullData.dataFactCl.claveTest
            ? props.fullData.dataFactCl.claveTest
            : "Vacio",
          fact_rutPruebas: props.fullData.dataFactCl.rutTest
            ? props.fullData.dataFactCl.rutTest
            : "Vacio",
        
        }
      }));
      // setformStateFactCl({
      
      // });
      // setDataconfirmFactCl({
       
      // });
    } else {
      haveFactCl(undefined);
      setUpdate({
        ...update,
        facturacioncl: false,
        fact_userProduccion: false,
        fact_claveProduccion: false,
        fact_rutProduccion: false,
        fact_userPruebas: false,
        fact_clavePruebas: false,
        fact_rutPruebas: false,
      });
      setformStateFactCl({
        fact_pHabilitado: undefined,
        fact_userProduccion: "Vacio",
        fact_claveProduccion: "Vacio",
        fact_rutProduccion: "Vacio",
        fact_userPruebas: "Vacio",
        fact_clavePruebas: "Vacio",
        fact_rutPruebas: "Vacio",
      });

      setFormState(prevState => ({
        ...prevState,
        dataFactCl: {
          fact_pHabilitado: undefined,
          fact_userProduccion: "Vacio",
          fact_claveProduccion: "Vacio",
          fact_rutProduccion: "Vacio",
          fact_userPruebas: "Vacio",
          fact_clavePruebas: "Vacio",
          fact_rutPruebas: "Vacio",
        
        }
      }));
      setDataConfirm(prevState => ({
        ...prevState,
        dataFactCl: {
          fact_pHabilitado: undefined,
          fact_userProduccion: "Vacio",
          fact_claveProduccion: "Vacio",
          fact_rutProduccion: "Vacio",
          fact_userPruebas: "Vacio",
          fact_clavePruebas: "Vacio",
          fact_rutPruebas: "Vacio",
        
        }
      }));
 
    }
    // setErp(event.target.value);
  };

  //erp
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  //step icon

  const handleIconStep = (step) => {
    if (step === 0) {
      LabelSetep = "Coordinado";
      return (
        <Box>
          <LockOpenIcon />
        </Box>
      );
    } else if (step === 1) {
      return <ManageAccountsIcon />;
    } else if (step === 2) {
      return <AssignmentIcon />;
    } else if (step === 3) {
      return <SupportAgentIcon />;  
    } else if (step === 4) {
      return <AccountBalanceIcon />;
    } else {
      return <ManageHistoryIcon />;
    }
  };
  {
    /* <Typography className="border-b-4 border-indigo-500"  color="primary">
                 
                 {label}
                </Typography> */
  }
  const FetchDatas = () => {
    let isEqualDataGeneral = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    let isEqualDataParticipant = JSON.stringify(dataConfirm.dataParticipant) === JSON.stringify(formState.dataParticipant);
    let isEqualGestTrgns =
      JSON.stringify(dataConfirm.dataProject) === JSON.stringify(formState.dataProject) && JSON.stringify(dataConfirm.dataFactCl) === JSON.stringify(formState.dataFactCl);

    rows = [
       dataConfirm.dataParticipant.name === formState.dataParticipant.name
        ? undefined
        : createData("Nombre",  dataConfirm.dataParticipant.name, formState.dataParticipant.name),
       dataConfirm.dataParticipant.businessName === formState.dataParticipant.businessName
        ? undefined
        : createData(
            "Razón Social",
             dataConfirm.dataParticipant.businessName,
            formState.dataParticipant.businessName
          ),
       dataConfirm.dataParticipant.commercialBusiness === formState.dataParticipant.commercialBusiness
        ? undefined
        : createData(
            "Giro",
             dataConfirm.dataParticipant.commercialBusiness,
            formState.dataParticipant.commercialBusiness
          ),
       dataConfirm.dataParticipant.manager === formState.dataParticipant.manager
        ? undefined
        : createData("Gerente general",  dataConfirm.dataParticipant.manager, formState.dataParticipant.manager),
       dataConfirm.dataParticipant.commercialAddress === formState.dataParticipant.commercialAddress
        ? undefined
        : createData(
            "Dirección Comercial",
             dataConfirm.dataParticipant.commercialAddress,
            formState.dataParticipant.commercialAddress
          ),
       dataConfirm.dataParticipant.email === formState.dataParticipant.email
        ? undefined
        : createData("Email DTE",  dataConfirm.dataParticipant.email, formState.dataParticipant.email),
       dataConfirm.dataParticipant.payContactPhones === formState.dataParticipant.payContactPhones
        ? undefined
        : createData(
            "Teléfono de Contacto Pago",
             dataConfirm.dataParticipant.payContactPhones,
            formState.dataParticipant.payContactPhones
          ),
       dataConfirm.dataParticipant.billsContactPhones === formState.dataParticipant.billsContactPhones
        ? undefined
        : createData(
            "Teléfono de Contacto Factura",
             dataConfirm.dataParticipant.billsContactPhones,
            formState.dataParticipant.billsContactPhones
          ),
       dataConfirm.dataParticipant.banksName === formState.dataParticipant.banksName
        ? undefined
        : createData("Banco",  dataConfirm.dataParticipant.banksName, formState.dataParticipant.banksName),
       dataConfirm.dataParticipant.bankAccount === formState.dataParticipant.bankAccount
        ? undefined
        : createData(
            "Cuenta Corriente",
             dataConfirm.dataParticipant.bankAccount,
            formState.dataParticipant.bankAccount
          ),
      
    ];
    rowsGestTrigonos = [
      dataConfirm.dataProject.isclient === formState.dataProject.isclient
      ? undefined
      : createData(
          "Tipo de Cliente",
          dataConfirm.dataProject.isclient === 0 ? "Externo" : "Bluetree",
          formState.dataProject.isclient === 0 ? "Externo" : "Bluetree"
        ),
        dataConfirm.dataProject.erp === formState.dataProject.erp
      ? undefined
      : createData(
          "Tipo de Facturador",( !dataConfirm.dataProject.erp? "Sin asiganción":
          props.facturadorErp.filter( 
            (data) => data.id ===  dataConfirm.dataProject.erp
          )[0].nombreErp),
          props.facturadorErp.filter(
            (data) => data.id === formState.dataProject.erp
          )[0].nombreErp
        ),
        dataConfirm.dataProject.id_nomina_pago === formState.dataProject.id_nomina_pago
      ? undefined
      : createData(
          "Tipo de Nomina",( !dataConfirm.dataProject.id_nomina_pago? "Sin asiganción":
          props.nominaPago.filter(
            (data) => data.id ===  dataConfirm.dataProject.id_nomina_pago
          )[0].nombreBanco),
          props.nominaPago.filter(
            (data) => data.id === formState.dataProject.id_nomina_pago
          )[0].nombreBanco
        ),

    dataConfirm.dataFactCl.fact_pHabilitado === formState.dataFactCl.fact_pHabilitado
      ? undefined
      : createData(
          "Facturación.CL Tipo de Ambiente", ( !dataConfirm.dataFactCl.fact_pHabilitado ? "Sin asiganción":
          dataConfirm.dataFactCl.fact_pHabilitado ? "Producción" : "Testing"),
          formState.dataFactCl.fact_pHabilitado ? "Producción" : "Testing"
        ),
    dataConfirm.dataFactCl.fact_userProduccion ===
    formState.dataFactCl.fact_userProduccion
      ? undefined
      : createData(
          "Usuario de Producción",
          dataConfirm.dataFactCl.fact_userProduccion,
          formState.dataFactCl.fact_userProduccion
        ),
    dataConfirm.dataFactCl.fact_rutProduccion ===
    formState.dataFactCl.fact_rutProduccion
      ? undefined
      : createData(
          "Rut de Producción",
          dataConfirm.dataFactCl.fact_rutProduccion,
          formState.dataFactCl.fact_rutProduccion
        ),

    dataConfirm.dataFactCl.fact_claveProduccion ===
    formState.dataFactCl.fact_claveProduccion
      ? undefined
      : createData(
          "Clave de Producción",
          dataConfirm.dataFactCl.fact_claveProduccion,
          formState.dataFactCl.fact_claveProduccion
        ),
    dataConfirm.dataFactCl.fact_userPruebas === formState.dataFactCl.fact_userPruebas
      ? undefined
      : createData(
          "Usuario de Pruebas",
          dataConfirm.dataFactCl.fact_userPruebas,
          formState.dataFactCl.fact_userPruebas
        ),
    dataConfirm.dataFactCl.fact_rutPruebas === formState.dataFactCl.fact_rutPruebas
      ? undefined
      : createData(
          "Rut de Pruebas",
          dataConfirm.dataFactCl.fact_rutPruebas,
          formState.dataFactCl.fact_rutPruebas
        ),
    dataConfirm.dataFactCl.fact_clavePruebas === formState.dataFactCl.fact_clavePruebas
      ? undefined
      : createData(
          "Clave de Pruebas",
          dataConfirm.dataFactCl.fact_clavePruebas,
          formState.dataFactCl.fact_clavePruebas
        ),
    ];

    rows = rows.filter((x) => x !== undefined);
    rowsGestTrigonos = rowsGestTrigonos.filter((x) => x !== undefined);
    if (isEqualDataGeneral) {
      return <div>No se han encontrado cambios</div>;
    } else {
      return (
        <Box className="">
          {
            isEqualDataParticipant? <></>: 
            <Box>
               <Typography variant="h6" className="mb-4" color="primary">
                  Datos Generales
                </Typography>
                <TableContainer component={Paper} className="bg-grey-100">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre Campo</TableCell>
                        <TableCell align="left">Atributo Antiguo</TableCell>
                        <TableCell align="left">Atributo Nuevo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.campo}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.campo}
                          </TableCell>
                          <TableCell align="left">{row.antiguo}</TableCell>
                          <TableCell align="left">{row.nuevo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>
          }
       {
            isEqualGestTrgns? <></>: 
            <Box>
               <Typography variant="h6" className="mb-4" color="primary">
                  Datos Gestión Trígonos
                </Typography>
                <TableContainer component={Paper} className="bg-grey-100">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre Campo</TableCell>
                        <TableCell align="left">Atributo Antiguo</TableCell>
                        <TableCell align="left">Atributo Nuevo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsGestTrigonos.map((row) => (
                        <TableRow
                          key={row.campo}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.campo}
                          </TableCell>
                          <TableCell align="left">{row.antiguo}</TableCell>
                          <TableCell align="left">{row.nuevo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Box>
          }
          
        </Box>
        
      );
    }
  };

  function verificarLista(list) {
    if (list.every((valor) => valor === false)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    let ver = verificarLista([
      dataActFactCl.isLoading,
      dataActProyect.isLoading,
      dataActPart.isLoading,
    ]);
    if (ver) {
      setOpenDialog(false);
      setLoading(false);
      setRen((prevRen) => prevRen + 1);
      console.log(ren)
      if(ren>0){
        props.sendIdAndLoad();
      }
    }
  }, [
    dataActFactCl.isLoading,
    dataActProyect.isLoading,
    dataActPart.isLoading,
  ]);

  function SubmitActProject(isEqual) {
    if (!isEqual) {
      // console.log(formStateProjects.erp);
      // console.log(dataconfirmProjects.erp);
      postActProyect({
        id_participants: props.fullData.dataParticipant.id,
        erp:
          formState.dataProject.erp != dataConfirm.dataProject.erp
            ? formState.dataProject.erp
            : null,
        vHabilitado:
        formState.dataProject.isclient != dataConfirm.dataProject.isclient
            ? formState.dataProject.isclient
            : null,
        id_nomina_pago:
        formState.dataProject.id_nomina_pago != dataConfirm.dataProject.id_nomina_pago
            ? formState.dataProject.id_nomina_pago
            : null,
      }).then((response) => {
        // refetchParticipant();
        // refetchFact();
      });
    } else {
    }
  }
  function SubmitFactCl() {
    if (props.fullData.dataFactCl.phabilitado != undefined) {
      //ejecuta el post de actualizar
      if (checkProduccion || checkPrueba) {
        postActFactCl({
          idParticipante: props.fullData.dataParticipant.id,
          usuario64:
            formState.dataFactCl.fact_userProduccion.trim() !=
            dataConfirm.dataFactCl.fact_userProduccion.trim()
              ? formState.dataFactCl.fact_userProduccion
              : null,
          ruT64:
            formState.dataFactCl.fact_rutProduccion.trim() !=
            dataConfirm.dataFactCl.fact_rutProduccion.trim()
              ? formState.dataFactCl.fact_rutProduccion
              : null,
          clave64:
            formState.dataFactCl.fact_claveProduccion.trim() !=
            dataConfirm.dataFactCl.fact_claveProduccion.trim()
              ? formState.dataFactCl.fact_claveProduccion
              : null,
          puerto64: null,
          incluyeLink64: null,
          usuarioTest:
            formState.dataFactCl.fact_userPruebas.trim() !=
            dataConfirm.dataFactCl.fact_userPruebas.trim()
              ? formState.dataFactCl.fact_userPruebas
              : null,
          claveTest:
            formState.dataFactCl.fact_clavePruebas.trim() !=
            dataConfirm.dataFactCl.fact_clavePruebas.trim()
              ? formState.dataFactCl.fact_clavePruebas
              : null,
          rutTest:
            formState.dataFactCl.fact_rutPruebas.trim() !=
            dataConfirm.dataFactCl.fact_rutPruebas.trim()
              ? formState.dataFactCl.fact_rutPruebas
              : null,
          phabilitado:
            formState.dataFactCl.fact_pHabilitado !=
            dataConfirm.dataFactCl.fact_pHabilitado
              ? formState.dataFactCl.fact_pHabilitado
              : dataConfirm.dataFactCl.fact_pHabilitado,
        }).then((response) => {
          // refetchParticipant();
          // refetchFact();
        });
      }
    } else {
      //ejecuta el post de agregar
      if (checkProduccion || checkPrueba) {
       
          postAddFactCl({
            idParticipante: props.fullData.dataParticipant.id,
            usuario64:
              formState.dataFactCl.fact_userProduccion.trim() !=
              dataConfirm.dataFactCl.fact_userProduccion.trim()
                ? formState.dataFactCl.fact_userProduccion
                : null,
            ruT64:
              formState.dataFactCl.fact_rutProduccion.trim() !=
              dataConfirm.dataFactCl.fact_rutProduccion.trim()
                ? formState.dataFactCl.fact_rutProduccion
                : null,
            clave64:
              formState.dataFactCl.fact_claveProduccion.trim() !=
              dataConfirm.dataFactCl.fact_claveProduccion.trim()
                ? formState.dataFactCl.fact_claveProduccion
                : null,
            puerto64: null,
            incluyeLink64: null,
            usuarioTest:
              formState.dataFactCl.fact_userPruebas.trim() !=
              dataConfirm.dataFactCl.fact_userPruebas.trim()
                ? formState.dataFactCl.fact_userPruebas
                : null,
            claveTest:
              formState.dataFactCl.fact_clavePruebas.trim() !=
              dataConfirm.dataFactCl.fact_clavePruebas.trim()
                ? formState.dataFactCl.fact_clavePruebas
                : null,
            rutTest:
              formState.dataFactCl.fact_rutPruebas.trim() !=
              dataConfirm.dataFactCl.fact_rutPruebas.trim()
                ? formState.dataFactCl.fact_rutPruebas
                : null,
            phabilitado: formState.dataFactCl.fact_pHabilitado,
          }).then((response) => {
            // refetchParticipant();
            // refetchFact();
          });
        
      }
    }
  }
  function SubmitActParticipant() {
    let formatBillsContactPhones =
    '["' + formState.dataParticipant.billsContactPhones.replace(/,/g, '","') + '"]';
    let formatpayContactPhones =
      '["' + formState.dataParticipant.payContactPhones.replace(/,/g, '","') + '"]';

    patchActPart({
      id: formState.dataParticipant.id,
      name: formState.dataParticipant.name,
      rut: formState.dataParticipant.rut,
      verificationCode: formState.dataParticipant.verificationCode,
      businessName: formState.dataParticipant.businessName,
      commercialBusiness: formState.dataParticipant.commercialBusiness,
      email: formState.dataParticipant.email,
      bankAccount: formState.dataParticipant.bankAccount,
      bank: formState.dataParticipant.bank,
      commercialAddress: formState.dataParticipant.commercialAddress,
      postalAddress: formState.dataParticipant.postalAddress,
      manager: formState.dataParticipant.manager,
      payContactFirstName: formState.dataParticipant.payContactFirstName,
      payContactLastName: formState.dataParticipant.payContactLastName,
      payContactAddress: formState.dataParticipant.payContactAddress,
      formatpayContactPhones: formatpayContactPhones,
      payContactEmail: formState.dataParticipant.payContactEmail,
      billsContactFirstName: formState.dataParticipant.billsContactFirstName,
      billsContactLastName: formState.dataParticipant.billsContactLastName,
      billsContactAddress: formState.dataParticipant.billsContactAddress,
      formatBillsContactPhones: formatBillsContactPhones,
      billsContactEmail: formState.dataParticipant.billsContactEmail,
    })
      .then((response) => {})
      .catch((error) => {});
  }

  const ApiPatch = () => {
    let isEqual = JSON.stringify(dataConfirm.dataParticipant) !== JSON.stringify(formState.dataParticipant);
    let isEqualFactCl = JSON.stringify(dataConfirm.dataFactCl) !== JSON.stringify(formState.dataFactCl);
    let isEqualProject= JSON.stringify(dataConfirm.dataProject) !== JSON.stringify(formState.dataProject);
    console.log("data participant distinto de dataconfirm ",isEqual);
    console.log("data facturacion distinto de dataconfirm ",isEqualFactCl);
    console.log("data tipo cliente nomina etc distinto de dataconfirm ",isEqualProject);
    setOpenDialog(true);
    setLoading(true);
    if(isEqual){
    SubmitActParticipant();
    }
    if(isEqualFactCl){
    SubmitFactCl();

    }
    if(isEqualProject){
    SubmitActProject();
    
    }
  
  };
  useEffect(() => {
    countActive === 0 ? setActiveButton(false) : setActiveButton(true);
  }, [countActive]);

  useEffect(() => {
    props.sendChange(alertOk);

    props.sendIdParticipant(formState.dataParticipant.id);
  }, [alertOk]);
  return (
    <Box className="w-full h-full">
      <Box className="flex w-full h-full" sx={{ width: "100%" }}>
        {/* SECCION VERTICAL IZQUIERDA */}

        <Box className="pr-[10px]  md:min-w-[300px] h-full">
          <Typography
            variant="h6"
            className="mb-4 flex flex-row"
            color="primary"
          >
            Gestión de Participantes
            <AdviceModule
              direction={"rtl"}
              textwidth={500}
              msg={
                'Al costado izquierdo podrá desplazarse en las distintas opciones para administrar la información asociada a un participante, al costado derecho podrá realizar uno o más cambios en un solo guardado presionando el icono de edición "Lapíz".'
              }
              className={"relative bottom-[8px]"}
              // classnamesegund={"absolute h-14 w-14 right-[230px] -bottom-[5px]"}
              classPopover={"ml-[20px] mr-[100px] mt-[-10px]"}
            />
          </Typography>

          <Stepper
            className="ml-[30px] mt-[30px]  mdmax:ml-[0px]"
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completed[index]}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "secondary.light",
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "secondary.light",
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "secondary.main",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "common.black",
                    },
                  "& .MuiStepIcon": {
                    color: "blue",
                  },
                }}
              >
                <StepButton
                  focusRipple
                  className="hover:bg-blue-50"
                  icon={handleIconStep(index)}
                  onClick={handleStep(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* SECCION VERTICAL DERECHA */}
        <Box className="flex mt-[30px]  border-solid border-l-2 w-full h-full">
          {allStepsCompleted() ? (
            <Box className="w-full h-full">
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Box>
          ) : (
            // <React.Fragment>

            // </React.Fragment>
            <Box className="ml-[10px]  h-full">
              <Box className=" w-full h-full ">
                {activeStep === 0 ? (
                  <Box className="w-full ">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Coordinado
                    </Typography>

                    <Box className="flex flex-wrap justify-start zerorange:justify-center  ">
                      <Box className="flex flex-col">
                        <TextField
                          // id="outlined-required"
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Nombre"
                          onChange={onInputChange}
                          type="text"
                          name="name"
                          defaultValue="Vacio"
                          disabled={name ? false : true}
                          value={formState.dataParticipant.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {name ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          name: false,
                                        });

                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant: {
                                        //     ...formState.dataParticipant,
                                        //     name: props.fullData.dataParticipant
                                        //     .name,
                                        //   }
                                         
                                        // });

                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            name: props.fullData.dataParticipant
                                            .name,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          name: false,
                                        });

                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        name: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {name ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Razón Social"
                          disabled={businessName ? false : true}
                          type="text"
                          name="businessName"
                          onChange={onInputChange}
                          defaultValue="Vacio"
                          value={formState.dataParticipant.businessName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {businessName ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          businessName: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant: {
                                        //     ...formState.dataParticipant,
                                        //     businessName:
                                        //     props.fullData.dataParticipant
                                        //       .business_Name,
                                        //   }
                                         
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            businessName:
                                            props.fullData.dataParticipant
                                              .business_Name,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          businessName: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        businessName: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {businessName ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Giro"
                          type="text"
                          defaultValue="Vacio"
                          onChange={onInputChange}
                          name="commercialBusiness"
                          disabled={commercialBusiness ? false : true}
                          value={formState.dataParticipant.commercialBusiness}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {commercialBusiness ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          commercialBusiness: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     commercialBusiness:
                                        //     props.fullData.dataParticipant
                                        //       .commercial_Business,
                                        //   }
                                        
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            commercialBusiness:
                                                props.fullData.dataParticipant
                                                  .commercial_Business,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          commercialBusiness: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        commercialBusiness: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {commercialBusiness ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <TextField
                        className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Rut"
                        type="text"
                        defaultValue="Vacio"
                        onChange={onInputChange}
                        name="rut"
                        disabled
                        value={formState.dataParticipant.rut}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       {rut ? (
                        //         <>
                        //           <CheckBoxIcon
                        //             style={{ cursor: 'pointer' }}
                        //             onClick={() => {
                        //               setUpdate({
                        //                 ...update,
                        //                 rut: false,
                        //               });
                        //               setCountActive(countActive>0?countActive-1:countActive);
                        //             }}
                        //           />
                        //           <DisabledByDefaultIcon
                        //             style={{ cursor: 'pointer' }}
                        //             onClick={() => {
                        //               setFormState({
                        //                 ...formState,
                        //                 rut: props.fullData.dataParticipant.rut,
                        //               });
                        //               setUpdate({
                        //                 ...update,
                        //                 rut: false,
                        //               });
                        //               setCountActive(countActive>0?countActive-1:countActive);
                        //             }}
                        //           />
                        //         </>
                        //       ) : (
                        //         <EditIcon
                        //           style={{ cursor: 'pointer' }}
                        //           onClick={() => {
                        //             setUpdate({
                        //               ...update,
                        //               rut: true,
                        //             });
                        //             setCountActive(countActive+1);
                        //           }}
                        //         />
                        //       )}
                        //     </InputAdornment>
                        //   ),
                        // }}
                        variant="filled"
                      />
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Gerente General"
                          type="text"
                          defaultValue="Vacio"
                          onChange={onInputChange}
                          name="manager"
                          disabled={manager ? false : true}
                          value={formState.dataParticipant.manager}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {manager ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          manager: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     manager:
                                        //     props.fullData.dataParticipant
                                        //       .manager,
                                        //   }
                                        
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            manager:
                                                props.fullData.dataParticipant
                                                  .manager,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          manager: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        manager: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {manager ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                    </Box>
                  </Box>
                ) : activeStep === 1 ? (
                  <Box className="w-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Datos de Contacto
                    </Typography>
                    <Box className="flex flex-wrap justify-start  zerorange:justify-center ml-[0 auto]">
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Dirección Comercial"
                          type="text"
                          name="commercialAddress"
                          disabled={commercialAddress ? false : true}
                          defaultValue="Vacio"
                          value={formState.dataParticipant.commercialAddress}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {commercialAddress ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          commercialAddress: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     commercialAddress:
                                        //     props.fullData.dataParticipant
                                        //       .commercial_address,
                                        //   }
                                         
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            commercialAddress:
                                            props.fullData.dataParticipant
                                              .commercial_address,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          commercialAddress: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        commercialAddress: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {commercialAddress ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Comuna"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}
                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Ciudad"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Email DTE"
                          type="email"
                          defaultValue="Vacio"
                          name="email"
                          disabled={email ? false : true}
                          value={formState.dataParticipant.email}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {email ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          email: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     email:
                                        //     props.fullData.dataParticipant
                                        //       .dte_Reception_Email,
                                        //   }
                                         
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            email:
                                            props.fullData.dataParticipant
                                              .dte_Reception_Email,
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          email: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        email: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {email ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Teléfono de Contacto Pago"
                          type="text"
                          defaultValue="Vacio"
                          name="payContactPhones"
                          disabled={payContactPhones ? false : true}
                          value={formState.dataParticipant.payContactPhones}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {payContactPhones ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          payContactPhones: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     payContactPhones:
                                        //     props.fullData.dataParticipant.pay_contact_phones.replace(
                                        //       /["\[\]"]/g,
                                        //       ""
                                        //     ),
                                        //   }
                                         
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            payContactPhones:
                                            props.fullData.dataParticipant.pay_contact_phones.replace(
                                              /["\[\]"]/g,
                                              ""
                                            ),
                                          }
                                        }));
                                        pointer;
                                        setUpdate({
                                          ...update,
                                          payContactPhones: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        payContactPhones: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {payContactPhones ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Teléfono de Contacto Factura"
                          type="text"
                          defaultValue="Vacio"
                          name="billsContactPhones"
                          disabled={billsContactPhones ? false : true}
                          value={formState.dataParticipant.billsContactPhones}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {billsContactPhones ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          billsContactPhones: false,
                                        });

                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     billsContactPhones:
                                        //     props.fullData.dataParticipant.bills_contact_phones.replace(
                                        //       /["\[\]"]/g,
                                        //       ""
                                        //     ),
                                        //   }
                                        
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            billsContactPhones:
                                            props.fullData.dataParticipant.bills_contact_phones.replace(
                                              /["\[\]"]/g,
                                              ""
                                            ),
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          billsContactPhones: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        billsContactPhones: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                        <div className="absolute ">
                          {billsContactPhones ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Nómina ID"
                        type="text"
                        defaultValue="Vacio"
                        value={"Vacio"}
                        variant="filled"
                      /> */}
                    </Box>
                  </Box>
                ) : activeStep === 2 ? (
                  <Box className="w-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Datos Bancarios
                    </Typography>
                    <Box className="flex flex-wrap justify-start  zerorange:justify-center ml-[0 auto]">
                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Banco"
                        type="text"
                        value={dataBank.name}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}
                      <Box className="flex flex-col">
                        <TextField
                          // disabled={banksName1 ? false : true}
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          id="standard-select-currency"
                          select
                          label="Banco"
                          value={formState.dataParticipant.banksName}
                          onChange={handleChangee}
                          variant="filled"
                          name="banksName"
                          disabled={banksName ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {banksName ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          banksName: false,
                                        });
                                        // setFormState({
                                        //   ...formState,
                                        //   banksName:
                                        //     props.fullData.dataParticipant.banksName,
                                        //   bank: props.fullData.dataParticipant.bank,
                                        // });
                                        // setBankk(props.fullData.dataParticipant.banksName);
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                     
                                        // setFormState({
                                        //   ...formState,
                                        //     dataParticipant:{
                                        //       ...formState.dataParticipant,
                                        //     banksName: props.fullData.dataParticipant
                                        //         .banksName,
                                        //     bank: props.fullData.dataParticipant
                                        //       .bank,
                                        //       }
                                          
                                          
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            banksName: props.fullData.dataParticipant
                                                .banksName,
                                            bank: props.fullData.dataParticipant
                                              .bank,
                                          
                                          }
                                        }));
                                        
                                        setBankk(
                                          props.fullData.dataParticipant
                                            .banksName
                                        );
                                        setUpdate({
                                          ...update,
                                          banksName: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        banksName: true,
                                        // });
                                        // setFormState({
                                        //   ...formState,
                                        //   bank: idBank,
                                        //   banksName: bankk,
                                        // });
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        >
                          {banks.map((data) => (
                            <MenuItem key={data.id} value={data.name}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <div className="absolute ">
                          {banksName ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="RUT Cuenta Corriente"
                          type="text"
                          value={formState.dataParticipant.rut}
                          onChange={onInputChange}
                          name="rut"
                          disabled={rut ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {rut ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          rut: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        
                                        // setFormState({
                                        //   ...formState,
                                        //    dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     rut: props.fullData.dataParticipant
                                        //     .rut,
                                        //    }
                                          
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            rut: props.fullData.dataParticipant
                                            .rut,
                                          
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          rut: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        rut: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          defaultValue="Vacio"
                          variant="filled"
                        />
                        <div className="absolute ">
                          {rut ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Cuenta Corriente"
                          type="text"
                          value={formState.dataParticipant.bankAccount}
                          onChange={onInputChange}
                          name="bankAccount"
                          disabled={bankAccount ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {bankAccount ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          bankAccount: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                    <DisabledByDefaultIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        
                                        // setFormState({
                                        //   ...formState,
                                        //   dataParticipant:{
                                        //     ...formState.dataParticipant,
                                        //     bankAccount:
                                        //     props.fullData.dataParticipant
                                        //       .bank_Account,
                                        //   }
                                       
                                        // });
                                        setFormState(prevState => ({
                                          ...prevState,
                                          dataParticipant: {
                                            ...prevState.dataParticipant,
                                            bankAccount:
                                            props.fullData.dataParticipant
                                              .bank_Account,
                                          
                                          }
                                        }));
                                        setUpdate({
                                          ...update,
                                          bankAccount: false,
                                        });
                                        setCountActive(
                                          countActive > 0
                                            ? countActive - 1
                                            : countActive
                                        );
                                      }}
                                    />
                                  </>
                                ) : (
                                  <EditIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        bankAccount: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          defaultValue="Vacio"
                          variant="filled"
                        />
                        <div className="absolute ">
                          {bankAccount ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                    </Box>
                  </Box>
                ) : activeStep === 3 ? (

                  <Box>
                  <Box className="Flex flex-col w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Agentes Asociados
                    </Typography>
                  </Box>
                  <Paper>
                  <TablaAgentes rutParticipant={props.fullData.dataParticipant.rutCompleto} nameParticipant={props.fullData.dataParticipant.business_Name}/>
                  </Paper>
                </Box>

                 
                ) : activeStep === 4 ? (
                  <Box className=" w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Gestión Trígonos
                    </Typography>
                    {/* Tipo usuario */}
                    <Box className="flex flex-wrap">
                      <Box>
                      <Box className="flex flex-col  w-full p-[10px] ">
                          <Box className="flex flex-row">
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className=""
                            >
                              Tipo de cliente
                            </Typography>
                            <InputAdornment className="m-[10px]">
                              {typeClient ? (
                                <>
                                  <CheckBoxIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        typeClient: false,
                                      });
                                      setCountActive(
                                        countActive > 0
                                          ? countActive - 1
                                          : countActive
                                      );
                                    }}
                                  />
                                  <DisabledByDefaultIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        typeClient: false,
                                      });
                                      setFormState(prevState => ({
                                        ...prevState,
                                        dataProject: {
                                          ...prevState.dataProject,
                                          isclient:
                                          props.fullData.dataProject
                                            .isclient,
                                        
                                        }
                                      }));
                                    
                                      isOurClient(dataconfirmProjects.isclient);
                                      setCountActive(
                                        countActive > 0
                                          ? countActive - 1
                                          : countActive
                                      );
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      typeClient: true,
                                    });
                                    setCountActive(countActive + 1);
                                  }}
                                />
                              )}
                            </InputAdornment>
                            <div className=" ">
                              {typeClient ? (
                                <>
                                  <span className="ml-[20px] text-red-500">
                                    Recuerde aceptar o cancelar el cambio
                                    realizado
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Box>
                          <div
                            className={`relative flex justify-stretch w-full h-full pointer-events-${
                              typeClient ? "auto" : "none"
                            } select-${typeClient ? "auto" : "none"}`}
                          >
                            <Box className="flex flex-wrap  ml-[10px]">
                              <Box>
                                <Box>
                                  <FormControlLabel
                                    label="Bluetree"
                                    control={
                                      <Checkbox
                                        checked={checkedBlue}
                                        onClick={() => {
                                          setCheckedBlue(true);
                                          setCheckedExt(false);
                                          setFormState(prevState => ({
                                            ...prevState,
                                            dataProject: {
                                              ...prevState.dataProject,
                                              isclient:1,
                                            }
                                          }));
                                        }}
                                      />
                                    }
                                  />
                                </Box>
                                <Box>
                                  <FormControlLabel
                                    label="Externo"
                                    control={
                                      <Checkbox
                                        checked={checkedExt}
                                        onClick={() => {
                                          setCheckedExt(true);
                                          setCheckedBlue(false);
                                          // setformStateProjects({
                                          //   ...formStateProjects,
                                          //   isclient: 0,
                                          // });
                                          setFormState(prevState => ({
                                            ...prevState,
                                            dataProject: {
                                              ...prevState.dataProject,
                                              isclient:0,
                                            
                                            }
                                          }));
                                        }}
                                      />
                                    }
                                  />
                                </Box>
                              </Box>
                              <TextField
                                className="zerorange:w-[200px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                                label="Token"
                                type="text"
                                value={"Vacio"}
                                variant="filled"
                              />
                            </Box>

                            {!typeClient ? (
                              <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  "></div>
                            ) : (
                              <></>
                            )}
                          </div>
                      </Box>
                      <Box className="flex flex-col  w-full p-[10px]   ">
                          <Box className="flex flex-row">
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className=""
                            >
                              Facturación.CL
                            </Typography>

                            {formState.dataProject.erp === 5 && erp === false ? (
                              <>
                                <InputAdornment className="m-[10px]">
                                  {facturacioncl ? (
                                    <>
                                      <CheckBoxIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          setUpdate({
                                            ...update,
                                            facturacioncl: false,
                                          });
                                          setCountActive(
                                            countActive > 0
                                              ? countActive - 1
                                              : countActive
                                          );
                                        }}
                                      />
                                      <DisabledByDefaultIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          setUpdate({
                                            ...update,
                                            facturacioncl: false,
                                            fact_userProduccion: false,
                                            fact_claveProduccion: false,
                                            fact_rutProduccion: false,
                                            fact_userPruebas: false,
                                            fact_clavePruebas: false,
                                            fact_rutPruebas: false,
                                          });
                                          // setFormState({
                                          //   ...formStateFactCl,

                                          //   fact_pHabilitado:
                                          //     dataconfirmFactCl.fact_pHabilitado,
                                          //   fact_userProduccion:
                                          //     dataconfirmFactCl.fact_userProduccion,
                                          //   fact_claveProduccion:
                                          //     dataconfirmFactCl.fact_claveProduccion,
                                          //   fact_rutProduccion:
                                          //     dataconfirmFactCl.fact_rutProduccion,
                                          //   fact_userPruebas:
                                          //     dataconfirmFactCl.fact_userPruebas,
                                          //   fact_clavePruebas:
                                          //     dataconfirmFactCl.fact_clavePruebas,
                                          //   fact_rutPruebas:
                                          //     dataconfirmFactCl.fact_rutPruebas,
                                          // });
                                          setFormState(prevState => ({
                                            ...prevState,
                                            dataFactCl: {
                                              fact_pHabilitado:
                                              dataConfirm.dataFactCl.fact_pHabilitado,
                                            fact_userProduccion:
                                              dataConfirm.dataFactCl.fact_userProduccion,
                                            fact_claveProduccion:
                                              dataConfirm.dataFactCl.fact_claveProduccion,
                                            fact_rutProduccion:
                                              dataConfirm.dataFactCl.fact_rutProduccion,
                                            fact_userPruebas:
                                              dataConfirm.dataFactCl.fact_userPruebas,
                                            fact_clavePruebas:
                                              dataConfirm.dataFactCl.fact_clavePruebas,
                                            fact_rutPruebas:
                                              dataConfirm.dataFactCl.fact_rutPruebas,
                                            
                                            }
                                          }));
                                          haveFactCl(
                                            dataConfirm.dataFactCl.fact_pHabilitado
                                          );
                                          setCountActive(
                                            countActive > 0
                                              ? countActive - 1
                                              : countActive
                                          );
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <EditIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          facturacioncl: true,
                                        });
                                        setCountActive(countActive + 1);
                                      }}
                                    />
                                  )}
                                </InputAdornment>
                                <div className=" ">
                                  {facturacioncl ? (
                                    <>
                                      <span className="ml-[20px] text-red-500">
                                        Recuerde aceptar o cancelar el cambio
                                        realizado
                                      </span>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </Box>
                          <div
                            className={`relative flex justify-stretch w-full h-full pointer-events-${
                              facturacioncl ? "auto" : "none"
                            } select-${facturacioncl ? "auto" : "none"}`}
                          >
                            <Box className="flex flex-col w-full h-full p-[10px]  ">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                className="flex justify-center w-ful"
                              >
                                Producción
                              </Typography>
                              <div className="flex justify-center w-full ">
                                <Checkbox
                                  checked={checkProduccion}
                                  // onChange={(event) => {

                                  // }}
                                  onClick={() => {
                                    setCheckProduccion(true);
                                    setCheckPrueba(false);
                                    setFormState(prevState => ({
                                      ...prevState,
                                      dataFactCl: {
                                        ...prevState.dataFactCl,
                                        fact_pHabilitado: true,
                                      
                                      }
                                    }));
                                    // setformStateFactCl({
                                    //   ...formStateFactCl,
                                    //   fact_pHabilitado: true,
                                    // });
                                  }}
                                />
                              </div>
                              <TextField
                                className="w-full mb-[10px]"
                                label="Usuario de Producción"
                                type="text"
                                value={formState.dataFactCl.fact_userProduccion}
                                onChange={onInputChangeFact}
                                name="fact_userProduccion"
                                disabled={fact_userProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formState.dataFactCl.fact_userProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_userProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_userProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_userProduccion:
                                                  dataConfirm.dataFactCl.fact_userProduccion,
                                                
                                                }
                                              }));
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_userProduccion:
                                              //     dataconfirmFactCl.fact_userProduccion,
                                              // });
                                              setUpdate({
                                                ...update,
                                                fact_userProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_userProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full mb-[10px]"
                                label="Clave de Producción"
                                type="text"
                                value={formState.dataFactCl.fact_claveProduccion}
                                onChange={onInputChangeFact}
                                name="fact_claveProduccion"
                                disabled={fact_claveProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                  formState.dataFactCl.fact_claveProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_claveProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_claveProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_claveProduccion:
                                              //     dataconfirmFactCl.fact_claveProduccion,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_claveProduccion:
                                                  dataConfirm.dataFactCl.fact_claveProduccion,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                fact_claveProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_claveProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full"
                                label="Rut de Producción"
                                type="text"
                                value={formState.dataFactCl.fact_rutProduccion}
                                onChange={onInputChangeFact}
                                name="fact_rutProduccion"
                                disabled={fact_rutProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formState.dataFactCl.fact_rutProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_rutProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_rutProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_rutProduccion:
                                              //     dataconfirmFactCl.fact_rutProduccion,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_rutProduccion:
                                                  dataConfirm.dataFactCl.fact_rutProduccion,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                fact_rutProduccion: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_rutProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                            </Box>

                            <Box className="flex flex-col w-full h-full  p-[10px] ">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                className="flex justify-center w-ful"
                              >
                                Testing
                              </Typography>
                              <div className="flex justify-center w-full">
                                <Checkbox
                                  checked={checkPrueba}
                                  // onChange={(event) => {
                                  //   setCheckPrueba(true);
                                  //   setCheckProduccion(false);
                                  // }}
                                  onClick={() => {
                                    setCheckPrueba(true);
                                    setCheckProduccion(false);
                                    // setformStateFactCl({
                                    //   ...formStateFactCl,
                                    //   fact_pHabilitado: false,
                                    // });
                                    setFormState(prevState => ({
                                      ...prevState,
                                      dataFactCl: {
                                        ...prevState.dataFactCl,
                                        fact_pHabilitado: false,
                                      
                                      }
                                    }));
                                  }}
                                />
                              </div>
                              <TextField
                                className="w-full mb-[10px] "
                                label="Usuario de Pruebas"
                                type="text"
                                value={formState.dataFactCl.fact_userPruebas}
                                onChange={onInputChangeFact}
                                name="fact_userPruebas"
                                disabled={fact_userPruebas ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formState.dataFactCl.fact_userPruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_userPruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_userPruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_userPruebas:
                                              //     dataConfirm.dataFactCl.fact_userPruebas,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_userPruebas:
                                                  dataConfirm.dataFactCl.fact_userPruebas,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                fact_userPruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_userPruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full mb-[10px] "
                                label="Clave de Pruebas"
                                type="text"
                                value={formState.dataFactCl.fact_clavePruebas}
                                onChange={onInputChangeFact}
                                name="fact_clavePruebas"
                                disabled={fact_clavePruebas ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formState.dataFactCl.fact_clavePruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_clavePruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_clavePruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_clavePruebas:
                                              //     dataConfirm.dataFactCl.fact_clavePruebas,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_clavePruebas:
                                                  dataConfirm.dataFactCl.fact_clavePruebas,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                fact_clavePruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_clavePruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                              <TextField
                                className="w-full "
                                label="Rut de Pruebas"
                                type="text"
                                value={formState.dataFactCl.fact_rutPruebas}
                                onChange={onInputChangeFact}
                                name="fact_rutPruebas"
                                disabled={fact_rutPruebas ? false : true}
                                InputProps={{
                                  defaultValue: formState.dataFactCl.fact_rutPruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_rutPruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_rutPruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateFactCl({
                                              //   ...formStateFactCl,
                                              //   fact_rutPruebas:
                                              //     dataConfirm.dataFactCl.fact_rutPruebas,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataFactCl: {
                                                  ...prevState.dataFactCl,
                                                  fact_rutPruebas:
                                                  dataConfirm.dataFactCl.fact_rutPruebas,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                fact_rutPruebas: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              fact_rutPruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                            </Box>

                            {!facturacioncl ? (
                              <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  "></div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Box>
                      <Box>
                        <Box className="flex flex-col  w-full p-[10px]  ">
                          <div
                            className={`relative flex justify-stretch w-full h-full `}
                          >
                            {/* pointer-events-${facturacioncl?"auto":"none"} select-${facturacioncl?"auto":"none"} */}

                            <Box className="flex flex-col w-full h-full mr-[10px]">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                // className="flex justify-center w-ful"
                              >
                                Facturador ERP
                              </Typography>
                              <TextField
                                // disabled={banksName1 ? false : true}
                                className="min-w-[250px]"
                                id="standard-select-currency"
                                select
                                label="Facturador"
                                value={formState.dataProject.erp}
                                onChange={handleChangeERP}
                                variant="filled"
                                name="erp"
                                disabled={erp ? false : true}
                                InputProps={{
                                  startAdornment: !facturacioncl ? (
                                    <InputAdornment position="start">
                                      {erp ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                erp: false,
                                              });

                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                            
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataProject: {
                                                  ...prevState.dataProject,
                                                  erp:
                                                  props.fullData.dataProject
                                                  .erp,
                                                
                                                }
                                              }));

                                              setUpdate({
                                                ...update,
                                                erp: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              erp: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                              >
                                {props.facturadorErp.map((data) => (
                                  <MenuItem key={data.id} value={data.id}>
                                    {data.nombreErp}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>

                            <Box className="flex flex-col w-full h-full">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                // className="flex justify-center w-ful"
                              >
                                Nomina de Pago
                              </Typography>

                              <TextField
                                // disabled={banksName1 ? false : true}
                                className="min-w-[250px]"
                                id="standard-select-currency"
                                select
                                label="Nomina de Pago"
                                value={formState.dataProject.id_nomina_pago || "Sin asignar"}
                                onChange={handleChangeNomina}
                                variant="filled"
                                name="nominaPago"
                                disabled={id_nomina_pago ? false : true}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {id_nomina_pago ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                id_nomina_pago: false,
                                              });

                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                          <DisabledByDefaultIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              // setformStateProjects({
                                              //   ...formStateProjects,
                                              //   id_nomina_pago:
                                              //     props.fullData.dataProject
                                              //       .id_nomina_pago,
                                              // });
                                              setFormState(prevState => ({
                                                ...prevState,
                                                dataProject: {
                                                  ...prevState.dataProject,
                                                  id_nomina_pago:
                                                  props.fullData.dataProject
                                                    .id_nomina_pago,
                                                
                                                }
                                              }));
                                              setUpdate({
                                                ...update,
                                                id_nomina_pago: false,
                                              });
                                              setCountActive(
                                                countActive > 0
                                                  ? countActive - 1
                                                  : countActive
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <EditIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            setUpdate({
                                              ...update,
                                              id_nomina_pago: true,
                                              // });
                                              // setFormState({
                                              //   ...formState,
                                              //   bank: idBank,
                                              //   banksName: bankk,
                                              // });
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                              >
                                {props.nominaPago.map((data) => (
                                  <MenuItem key={data.id} value={data.id}>
                                    {data.nombreBanco}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>

                            {/* {!facturacioncl ? ( <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  ">
                            </div>):<></>} */}
                          </div>
                        </Box>
                      </Box>
                        
                      
                      </Box>
                      
                    </Box>
                    
                      
                  </Box>
                ) : (
               
                  <Box>
                    <Box className="Flex flex-col w-full h-full">
                      <Typography variant="h6" className="mb-4" color="primary">
                        Historificación
                      </Typography>
                    </Box>
                    <Paper>
                      <TablaHistorificacion
                        idParticipant={props.fullData.dataParticipant.id}
                      />
                    </Paper>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box className=" flex justify-end w-full m-[20px]">
        {alertOk && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              Se actualizo la instrucción correctamente..
            </Alert>
          </Stack>
        )}
        {alertError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
              Error!! debe modificar uno o más campos para guardar..
            </Alert>
          </Stack>
        )}
        <Button
          className="w-[100px]"
          variant="contained"
          color="secondary"
          // startIcon={<SearchIcon />}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Atrás
        </Button>

        <Button
          className="w-[100px] ml-[10px] mr-[10px]"
          variant="contained"
          color="secondary"
         
          onClick={handleNext}
        >
          Siguiente
        </Button>
        <Button
          disabled={activeButton}
          className="w-[100px] mr-[10px]"
          variant="contained"
          color="primary"
          
          onClick={handleClickOpen}
        >
          Guardar
        </Button>

        <Dialog
          open={open}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estas seguro de guardar estos cambios?"}
          </DialogTitle>
          <DialogContent>
            <Box>{FetchDatas()}</Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={handleCloseAlertSubmit} autoFocus>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        {/* {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: "inline-block" }}>
              Confirmado
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? "Finalizar"
                : "completar"}
            </Button>
          ))} */}
        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          scroll={"paper"}
        >
          {loading ? (
            <div className="flex justify-center items-center h-[250px] w-[300px]">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              {msgResp && (
                <div className="grid justify-items-center content-center h-[250px] w-[300px]">
                  {msgError ? (
                    <>
                    <div className="">
                    <WarningIcon className="w-[68px] h-[68px] text-red" />
                    </div>
                    <b className="text-justify text-red p-[20px]">{msgText}</b>
                    </>
                    
                  ) : (
                    <div className="grid justify-items-center content-center h-[250px] w-[300px]">
                      <div>
                      <CheckCircleIcon className="w-[68px] h-[68px] text-green" />
                      </div>
                      
                      <b className="text-justify text-red p-[20px]">{msgText}</b>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Dialog>
      </Box>
    </Box>
  );
}
