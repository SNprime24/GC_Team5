import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function CustomerAnalysisBar({ name, metric }) {
  return (
    <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="h6" color="text.secondary">{metric}</Typography>
    </Paper>
  );
}

export default CustomerAnalysisBar;