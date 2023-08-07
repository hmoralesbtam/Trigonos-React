import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

//Button edition
import * as React from 'react';
import Button from '@mui/material/Button';

import BrushIcon from '@mui/icons-material/Brush';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import IconButton from '@mui/material/IconButton';
//Tabs
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import ActivityProfile from "./tabs/ActivityProfile";
import ConfigProfile from "./tabs/ConfigProfile";
import InfoProfile from "./tabs/InfoProfile";
import ModalSelectImage from "./widgets/ModalSelectImage";
// import React from 'react'
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}
const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
      backgroundColor: theme.palette.background.paper,
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    },
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const ProfileApp = () => {
  
  const user = useSelector(selectUser);
  const [value, setValue] = useState(0);
  const [table, setTable] = React.useState(true);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <Root
    header={
      
          <header>
              <Box className="flex flex-col">
              
              <Box className="relative">
              <img className="h-160 lg:h-320 object-cover w-full" src="assets\images\pages\profile\cover.jpg" alt="Profile Cover"/>
                <Box className="absolute bottom-0 right-0 ">

              
                <Button className="m-[10px]" size="small" variant="contained" startIcon={<BrushIcon />}>
                  Editar portada
                </Button>
                </Box>
              </Box>
              
              <Box className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
              <Box className="-mt-96 lg:-mt-88 rounded-full">
                <Box className="relative" >
                  <Avatar
                  className="w-128 h-128 border-4"
                    alt="Photo" 
                    src="assets\images\pages\profile\cover.jpg"
                  />
                  <IconButton className="bg-grey-300 absolute top-0 right-0" title="Agregar foto de perfil" sx={{}} onClick={
                    table
                    ? () => setTable(false)
                    : () => setTable(true)
                  }>
                        <AddAPhotoRoundedIcon  />
                  </IconButton>
                </Box>
              </Box>
              <Box className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
                  <p className="text-lg font-bold leading-none">
                  {user.data.nombre} {user.data.apellido}
                  </p>
                  <p className="">
                  {capitalize(user.role.toString())}
                  </p>
              </Box>
                  
              <Box className="hidden lg:flex h-32 mx-32 border-l-2"></Box>
              Pequeña descripcion aqui
              
              <Box className="flex flex-1 justify-end my-16 lg:my-0">
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Actividad" {...a11yProps(0)} />
                <Tab label="Información" {...a11yProps(1)} />
                <Tab label="Configuración" {...a11yProps(2)} />
              </Tabs>
              </Box>
              </Box>
              </Box>
             
          </header  >
     
    }
      content={
      
            <Container >
            {value === 0 && ( <ActivityProfile value={value} index={value}/> )}
            {value === 1 && (  <ConfigProfile value={value} index={value}/> )}
            {value === 2 && (  <InfoProfile value={value} index={value}/> )}
            {!table && (
                <ModalSelectImage
                  
                  setTable={() => setTable(true)}
                />
              )}
            </Container>
        
      }
      scroll="content"
    />
  )
}
export default ProfileApp;
