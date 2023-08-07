import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalTablaCampo from "./ModalTablaCampo";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function ModalCampo({
  valueId,
  date,
  hide = true,
  setTable,
  rows,
}) {
  const [open, setOpen] = React.useState(hide);

  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  const prueba = rows.find((p) => p.id === valueId);
  console.log(prueba);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <Box sx={style}>
            <Box className="flex justify-end">
              <Button onClick={handleClose} variant="contained" color="error">
                <HighlightOffIcon />
              </Button>
            </Box>

            <Typography variant="h6" className="mb-[10px]" color="primary">
              Cambios realizados el <b>{date}</b>
            </Typography>
            <Box className="inline-block align-middle mb-[10px]">
              Listado de cambios asociados al <b>ID {valueId}</b>
              {/* <TextField
                className="w-[100px]"
                disabled
               
                defaultValue="9612"
                /> */}
            </Box>

            {/* <ModalTablaCampo data={prueba} /> */}
            <ModalTablaCampo prueba={prueba} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
