import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//Cancel
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import IconButton from "@mui/material/IconButton";

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
export default function ModalSelectImage({ setTable }) {
  const [open, setOpen] = React.useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={style}>
            <Box className="flex justify-end">
              <IconButton
                className="bg-grey-300 absolute top-0 right-0"
                color="error"
                title="Cerrar"
                sx={{}}
                onClick={handleClose}
              >
                <ClearRoundedIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" className="mb-[10px]" color="primary">
              Cambiar foto de perfil
            </Typography>
            <Box className="inline-block align-middle mb-[10px]">
              <div>
                {selectedImage ? (
                  <div className="flex flex-row">
                    <div className="bg-gray-100 w-[200px] h-[200px] m-[10px]">
                      <img
                        alt="not found"
                        width={"200px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                    <div className="bg-gray-100 w-[200px] h-[200px] m-[10px]">
                      <br />
                      <button onClick={() => setSelectedImage(null)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    <div className="bg-gray-100 w-[200px] h-[200px] m-[10px]">
                      <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                          setSelectedImage(event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="bg-gray-100 w-[200px] h-[200px] m-[10px]">
                      Selecciona una imagen
                    </div>
                  </div>
                )}

                <br />
                <br />
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
