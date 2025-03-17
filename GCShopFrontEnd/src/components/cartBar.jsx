import React from "react";
import {  Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const imagePlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s";

export default function CartBar({ item,updateQuantity,removeItem }){
    const theme = useTheme();
    return(
        <Box
        key={item.id}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
        }}
        >

        <Box display="flex" alignItems="center" gap={2} sx={{ width: "10%" }}>
            <img src={!(item.image=="") ? item.image : imagePlaceholder} alt={item.name} width={80} height={80} />
            <Box>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1" color="text.secondary">
                ${item.price.toFixed(2)}
            </Typography>
            </Box>
        </Box>

        <Box display="flex" alignItems="center" sx={{ width: "10%" }}>
            <IconButton onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
            <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 1 }}>
            {item.quantity}
            </Typography>
            <IconButton onClick={() => updateQuantity(item.id, 1)}>
            <AddIcon />
            </IconButton>
        </Box>

        {/* Remove Button */}
        <IconButton onClick={() => removeItem(item.id)} color="error" sx={{ width: "10%" }}>
            <DeleteIcon />
        </IconButton>
        </Box>
    )
}