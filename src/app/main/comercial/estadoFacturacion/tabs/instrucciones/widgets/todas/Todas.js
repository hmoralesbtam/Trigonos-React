import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Box from '@mui/material/Box';
import _ from '@lodash';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const options = ['Option 1', 'Option 2'];
const optionsv2 = ['Option 3', 'Option 4'];
const optionsv3 = ['17267270-1', '24706597-0'];
// let counter = 0;
const Todas = () => {
  const { register, handleSubmit } = useForm();

  const [value, setValue] = useState(options[0]);
  const [valuev2, setValuev2] = useState(optionsv2[0]);
  const [valuev3, setValuev3] = useState(optionsv3[0]);
  const [inputValuev2, setInputValuev2] = useState('');
  const [inputValuev3, setInputValuev3] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (d) => alert(JSON.stringify(d), {value});


  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      className="flex-auto border-l-0"
    >
      <div className="mb-24">
        <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
          Filtros
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-24">
            <Autocomplete
                {...register('Coordinado')}
                value={valuev2}
                onChange={(event, newValue) => {
                  setValuev2(newValue);
                }}
                inputValue={inputValuev2}
                onInputChange={(event, newInputValue) => {
                  setInputValuev2(newInputValue);
                }}
                id="combo-box-demo"
                options={optionsv2}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} {...register('Coordinado')} label="Coordinado" />}
              />
            </div>
            <div className="mt-24">
            <Autocomplete
                {...register('Rut')}
                value={valuev3}
                onChange={(event, newValue) => {
                  setValuev3(newValue);
                }}
                inputValue={inputValuev3}
                onInputChange={(event, newInputValue) => {
                  setInputValuev3(newInputValue);
                }}
                id="combo-box-demo"
                options={optionsv3}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} {...register('Rut')} label="Rut" />}
              />
            </div>
            <div className="mt-24">
              <TextField
                {...register('MontoNeto')}
                id="outlined-basic"
                label="Monto Neto"
                variant="outlined"
              />
            </div>
            <div className="mt-24">
              <TextField
                {...register('folio')}
                id="outlined-basic"
                label="Folio"
                variant="outlined"
              />
              {/* <p>
              Render: <span>{counter = 1}</span>
            </p> */}
            </div>
            <div className="mt-24">
              <Autocomplete
                {...register('Concepto')}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} {...register('Concepto')} label="Concepto" />}
              />
            </div>
            <div className="mt-24">
              <Button type="submit" value="submit" variant="contained" color="success">
                Buscar
              </Button>
            </div>
          </form>

          <Divider />
        </Box>
      </div>
      <div className="mb-24">
        <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
          Etiquetas
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <FormGroup>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookmarkBorderIcon color="success" />
                    </ListItemIcon>
                    <FormControlLabel control={<Switch />} label="Facturadas" />
                    <FormControlLabel control={<Switch />} label="No Facturadas" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookmarkBorderIcon color="error" />
                    </ListItemIcon>
                    <FormControlLabel control={<Switch />} label="Pagadas" />
                    <FormControlLabel control={<Switch />} label="No Pagadas" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookmarkBorderIcon color="primary" />
                    </ListItemIcon>
                    <FormControlLabel control={<Switch />} label="Recepcionadas" />
                    <FormControlLabel control={<Switch />} label="No Recepcionadas" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookmarkBorderIcon color="warning" />
                    </ListItemIcon>
                    <FormControlLabel control={<Switch />} label="Aceptadas" />
                    <FormControlLabel control={<Switch />} label="No Aceptadas" />
                  </ListItemButton>
                </ListItem>
              </List>
            </FormGroup>
          </nav>
          <Divider />
        </Box>
      </div>
    </motion.div>
  );
};

export default Todas;
