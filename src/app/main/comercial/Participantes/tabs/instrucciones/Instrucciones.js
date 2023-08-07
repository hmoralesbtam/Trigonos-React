import { motion } from "framer-motion";
import React from "react";
import ParticipantesTable from "../StickyHeadTable";
import Filtros from "./widgets/Filtros";

const Instrucciones = (props) => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-12 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show">
      <ParticipantesTable />
    </motion.div>
  );
};
export default Instrucciones;
