// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import _ from "@lodash";
// import Button from "@mui/material/Button";
// import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
// import { getProjects, selectProjects } from "./store/proyectsSlide";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";

// let varid;
// const AcuseteAppHeader = (props) => {
//   const dispatch = useDispatch();
//   const projects = useSelector(selectProjects);
//   const [selectedProject, setSelectedProject] = useState({
//     id: 141 /* Dinamico -  */,
//     menuEl: null,
//   });
//   useEffect(() => {
//     dispatch(getProjects());
//     props.passToken(varid);
//   }, [dispatch, selectedProject]);

//   function handleChangeProject(id) {
//     props.clearStates();
//     props.clearFilters();
//     setSelectedProject({
//       id: id,
//       menuEl: null,
//     });
//   }

//   function handleOpenProjectMenu(event) {
//     setSelectedProject({
//       id: selectedProject.id,
//       menuEl: event.currentTarget,
//     });
//   }

//   function handleCloseProjectMenu() {
//     setSelectedProject({
//       id: selectedProject.id,
//       menuEl: null,
//     });
//   }
//   varid = selectedProject.id;

//   if (_.isEmpty(projects)) {
//     return (
//       <div className="flex flex-col w-full px-24 sm:px-32">
//         <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
//           <div className="flex flex-auto items-center min-w-0">
//             <Avatar className="flex-0 w-64 h-64" alt="user photo" src="">
//               ""
//             </Avatar>

//             <div className="flex flex-col min-w-0 mx-16">
//               <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
//                 Bienvenido, Administrador!
//               </Typography>

//               <div className="flex items-center">
//                 <FuseSvgIcon size={20} color="action">
//                   heroicons-solid:bell
//                 </FuseSvgIcon>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
//             <LinearProgress color="success" />
//           </Stack>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="flex flex-col w-full px-24 sm:px-32">
//       <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
//         <div className="flex flex-auto items-center min-w-0">
//           <Avatar className="flex-0 w-64 h-64" alt="user photo" src="">
//             ""
//           </Avatar>

//           <div className="flex flex-col min-w-0 mx-16">
//             <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
//               Bienvenido, Administrador!
//             </Typography>

//             <div className="flex items-center">
//               <FuseSvgIcon size={20} color="action">
//                 heroicons-solid:bell
//               </FuseSvgIcon>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center">
//         <Button
//           onClick={handleOpenProjectMenu}
//           className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
//           variant="default"
//           sx={{
//             backgroundColor: (theme) => theme.palette.background.default,
//             borderColor: (theme) => theme.palette.divider,
//           }}
//           endIcon={
//             <FuseSvgIcon size={20} color="action">
//               heroicons-solid:chevron-down
//             </FuseSvgIcon>
//           }>
//           {_.find(projects, ["id", selectedProject.id]).business_Name}
//         </Button>
//         <Menu
//           id="project-menu"
//           anchorEl={selectedProject.menuEl}
//           open={Boolean(selectedProject.menuEl)}
//           onClose={handleCloseProjectMenu}>
//           {projects &&
//             projects.map((project) => (
//               <MenuItem
//                 key={project.id}
//                 onClick={(ev) => {
//                   handleChangeProject(project.id);
//                 }}>
//                 {project.business_Name}
//               </MenuItem>
//             ))}
//         </Menu>
//       </div>
//     </div>
//   );
// };

// export default AcuseteAppHeader;
