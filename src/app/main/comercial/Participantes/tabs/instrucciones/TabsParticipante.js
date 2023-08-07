import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabsParticipante({change,valuee='one'}) {
  const [value, setValue] = React.useState(valuee);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
const prueba = () =>{
    change()
    if(value === 'one')
    {
        setValue('two')
        return
    }
    setValue('one')
    
    
}
return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={prueba}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Modificar" />
        <Tab value="two" label="Historificacion" />
      </Tabs>
    </Box>
  );
}