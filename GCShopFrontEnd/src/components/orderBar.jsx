import React from "react";
import {  Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";


export default function OrderBar ({order, access}){
    const theme =  useTheme()

    return(
        <Box
            key={order.id}
            p={2}
            sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            }}
        >
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            >
                <Typography variant="h6">
                    Order # {order.id} - {order.date}
                </Typography>
                {access==="customer"?
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Sold by: <strong>{order.storeName}</strong>
                    </Typography>
                    :
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Bought by: <strong>{order.customerName}</strong>
                    </Typography>
                }

            </Box>

            {order.items.map((item, index) => (
                <Typography key={index} variant="body1" sx={{ ml: 2 }}>
                    {item.quantity} × {item.name} - ${item.price.toFixed(2)}
                </Typography>
            ))}

            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            >
                <Typography variant="h6">Total: ${order.total.toFixed(2)}</Typography>
                <Chip
                    label={order.status}
                    color={
                    order.status === "Delivered"
                        ? "success"
                        : order.status === "Shipped"
                        ? "primary"
                        : "warning"
                    }
                />
            </Box>

        </Box>
    );
}