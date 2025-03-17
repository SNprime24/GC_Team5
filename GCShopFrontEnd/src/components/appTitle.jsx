import React from "react";
import { Stack, Typography, } from "@mui/material";
import GCShop from "../assets/GCShop.webp";

export default function AppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <img src={GCShop} alt="GC Shop Logo" width={40} height={40} />
        <Typography variant="h5">GC Shop App</Typography>
      </Stack>
    );
}