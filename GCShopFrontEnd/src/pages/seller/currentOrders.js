import React, { useState } from "react";
import { Container, Box, Typography, Button, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import OrderBar from "../../components/orderBar";

const initialOrders = [
  {
    id: 101,
    date: "March 16, 2025",
    customerName: "John Doe",
    storeName: "Tech World",
    items: [
      { name: "Wireless Headphones", price: 199.99, quantity: 1 },
      { name: "Smart Watch", price: 129.99, quantity: 2 },
    ],
    total: 459.97,
    status: "Shipped",
  },
  {
    id: 102,
    date: "March 14, 2025",
    customerName: "Jane Smith",
    storeName: "Gamer's Hub",
    items: [{ name: "Gaming Mouse", price: 49.99, quantity: 1 }],
    total: 49.99,
    status: "Delivered",
  },
];

function OrderPage() {
  const theme = useTheme();
  const [orders] = useState(initialOrders);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textAlign: "center",
          mb: 3,
          color: theme.palette.primary.main,
        }}
      >
        YOUR ORDERS
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {orders.filter(orders=>orders.status=="Shipped").length > 0 ? (
          orders
            .filter(orders=>orders.status=="Shipped")
            .map((order) => (
              <OrderBar order={order} access="seller"/>
            ))
        ) : (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No orders in Shipment...
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default OrderPage;
