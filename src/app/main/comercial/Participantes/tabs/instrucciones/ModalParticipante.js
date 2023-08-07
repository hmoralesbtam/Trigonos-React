import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SimpleForm } from "./SimpleForm";
import TabsParticipante from "./TabsParticipante";
import TablaHistorica from "./widgets/TablaHistorica";
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
};
let apiHistorial = {};
export default function BasicModal({
  hide = true,
  setTable,
  diccionario,
  projects,
}) {
  const [open, setOpen] = React.useState(hide);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  const [edicion, setEdicion] = React.useState(true);

  const changeWindow = () => {
    if (edicion === true) {
      setEdicion(false);
      return;
    }
    setEdicion(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {/* <TabsParticipante/> */}

        <Box sx={edicion ? style : stylem}>
          {edicion ? (
            <TabsParticipante change={changeWindow} />
          ) : (
            <TabsParticipante change={changeWindow} />
          )}
          {!edicion && (
            <TablaHistorica projects={projects} diccionariop={diccionario} />
          )}

          {edicion && (
            <SimpleForm cerrar={handleClose} diccionariop={diccionario} />
          )}
          {!edicion && (
            <Box sx={{ mt: 1.5, alignItems: "center" }}>
              <Button
                sx={{ width: 200 }}
                onClick={handleClose}
                variant="contained"
                color="error">
                {" "}
                Atras{" "}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}
