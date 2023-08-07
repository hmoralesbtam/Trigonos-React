import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
export default function ConfigProfile(props)  {
    const { children, value, index, ...other } = props;
  return (
    <div
        className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >{value === index && (
        <Box className="w-full md:flex">
            <Box className="flex flex-col w-full md:w-320 md:ltr:mr-32 md:rtl:ml-32">
              <Paper className="flex flex-col w-full px-32 pt-24">
                Configuración
              </Paper>
            </Box>
            <Box className="flex flex-col flex-1">
             <Paper className="flex flex-col w-full px-32 pt-24">
                
              </Paper>
            </Box>
          </Box>
      )}
      </div>
  )
}
