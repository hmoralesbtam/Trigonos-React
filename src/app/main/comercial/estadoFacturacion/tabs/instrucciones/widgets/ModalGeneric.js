import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormInstructions from "./FormInstructions";
import { use } from "i18next";
// import { SimpleForm } from "./SimpleForm";
// import TabsParticipante from "./TabsParticipante";
// import TablaHistorica from "./widgets/TablaHistorica";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  MuiCard: {
    // Name of the rule
    root: {
      // Some CSS
      overflow: "visible",
    },
  },
};
const stylem = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  MuiCard: {
    // Name of the rule
    root: {
      // Some CSS
      overflow: "visible",
    },
  },
};

const ModalGeneric = (props) => {
  let acreedor = false;
  let modalRef = React.useRef();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    let handler = (e) => {
      if (modalRef.current != null) {
        if (!modalRef.current.contains(e.target)) {
          // // setOpen(false);
          props.closeModal();
        }
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);
  const handleClose = (numero) => {
    if (numero === 0) {
      setOpen(false);
    }
    if (numero === 1) {
      setOpen(true);
    }
  };
  React.useEffect(() => {
    props.getOpenModal(handleClose);
  }, []);
  for (let x = 0; x < props.proyects.length; x++) {
    if (props.proyects[x].business_Name === props.data.nombreAcreedor) {
      acreedor = true;
    }
    if (props.proyects[x].business_Name === props.data.nombreDeudor) {
    }
  }
  let billingDate = new Date(props.data.fecha_emision);
  let receptionDate = new Date(props.data.fecha_recepcion);
  let emisione = `20${billingDate.getYear().toString().slice(1, 3)}/${
    billingDate.getMonth() + 1
  }/${billingDate.getDate()}`;
  let recepcione = `20${receptionDate.getYear().toString().slice(1, 3)}/${
    receptionDate.getMonth() + 1
  }/${receptionDate.getDate()}`;
  emisione === "2017/1/1" ? (emisione = false) : (emisione = true);
  recepcione === "2017/1/1" ? (recepcione = false) : (recepcione = true);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose(0)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormInstructions
            data={props.data}
            onClose={props.closeModal}
            acreedor={acreedor}
            emisione={emisione}
            fechaRecepcion={recepcione}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default ModalGeneric;
