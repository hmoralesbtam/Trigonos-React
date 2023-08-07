import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';

function FooterLayout2(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: footerTheme.palette.background.paper }}
      >
        <Toolbar className="container min-h-48 md:min-h-38 px-8 sm:px-12 py-0 flex items-center justify-center overflow-x-auto">
        <img className="w-full max-w-64" src="assets/images/logo/logoTRGNS.png" alt="footer logo" /> Trígonos Energy V.0.18
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout2);
