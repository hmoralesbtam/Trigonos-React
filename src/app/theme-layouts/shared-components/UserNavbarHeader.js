import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
const Root = styled('div')(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(selectUser);
  // const [userMenu, setUserMenu] = useState(null);

  // const userMenuClose = () => {
  //   setUserMenu(null);
  // };
  return (
    <Root className="user relative flex flex-col items-center justify-center p-16 pb-14 shadow-0">
      <div className="flex items-center justify-center mb-24">
        <Avatar
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
          }}
          className="avatar text-32 font-bold w-96 h-96"
          src={user.data.photoURL}
          alt={user.data.displayName}
        >
          {user.data.displayName.charAt(0)}
        </Avatar>
      </div>
      <Typography className="username text-14 whitespace-nowrap font-medium">
        {user.data.nombre }{" "} {user.data.apellido }
      </Typography>
      <Typography className="email text-13 whitespace-nowrap font-medium" color="text.secondary">
        {user.data.email}
      </Typography>
        <MenuItem
          component={NavLink}
          to="/sign-out"
          // onClick={() => {
          //   userMenuClose();
          // }}
          >
          <ListItemIcon className="min-w-40">
            <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
    </Root>
  );
}

export default UserNavbarHeader;
