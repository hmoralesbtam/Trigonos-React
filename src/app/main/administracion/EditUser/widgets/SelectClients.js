import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useState } from "react";

let rows = [];
export default function SelectClients({ participants = {} }) {
  //   const  {data} = participants
  participants.map((value) =>
    rows.push({ name: value.name, id: value.id, selected: true })
  );
  // console.log(rows);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      prueba
    </Grid>
  );
}
