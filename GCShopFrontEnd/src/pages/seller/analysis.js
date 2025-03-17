import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomerAnalysisBar from "../../components/customerAnalysisBar";

const initialOrders = [
  { id: 101, customerName: "John Doe", totalAmount: 459.97, status: "Delivered" },
  { id: 102, customerName: "Jane Smith", totalAmount: 49.99, status: "Cancelled" },
  { id: 103, customerName: "Alice Johnson", totalAmount: 199.99, status: "Delivered" },
  { id: 104, customerName: "John Doe", totalAmount: 299.99, status: "Cancelled" },
  { id: 105, customerName: "Jane Smith", totalAmount: 150.0, status: "Cancelled" },
];

function CustomerAnalysisPage() {
  const theme = useTheme();
  const [orders] = useState(initialOrders);
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [cancelledCustomers, setCancelledCustomers] = useState([]);

  useEffect(() => {
    // Aggregate total amounts per customer
    const customerTotals = orders.reduce((acc, order) => {
      if (order.status === "Delivered") {
        acc[order.customerName] = (acc[order.customerName] || 0) + order.totalAmount;
      }
      return acc;
    }, {});

    // Sort customers by total order amount (descending)
    const sortedTotalOrders = Object.entries(customerTotals)
      .map(([customer, total]) => ({ customer, total }))
      .sort((a, b) => b.total - a.total);

    setSortedCustomers(sortedTotalOrders);

    // Count cancelled orders per customer
    const cancelledOrders = orders.reduce((acc, order) => {
      if (order.status === "Cancelled") {
        acc[order.customerName] = (acc[order.customerName] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort customers by most cancelled orders (descending)
    const sortedCancelledOrders = Object.entries(cancelledOrders)
      .map(([customer, count]) => ({ customer, count }))
      .sort((a, b) => b.count - a.count);

    setCancelledCustomers(sortedCancelledOrders);
  }, [orders]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, textAlign: "center", mb: 3, color: theme.palette.success.main }}>
        Top Customers by Spending
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {sortedCustomers.map(({ customer, total }) => (
          <CustomerAnalysisBar key={customer} name={customer} metric={`$${total.toFixed(2)}`} />
        ))}
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 900, textAlign: "center", mt: 4, mb: 3, color: theme.palette.error.main }}>
        Customers with Most Cancellations
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {cancelledCustomers.map(({ customer, count }) => (
          <CustomerAnalysisBar key={customer} name={customer} metric={`${count} Cancellations`} />
        ))}
      </Box>
    </Container>
  );
}

export default CustomerAnalysisPage;
