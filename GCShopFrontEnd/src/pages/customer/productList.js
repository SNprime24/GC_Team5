import React from "react";
import ProductCard from '../../components/productCard';
import { Container, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality noise-canceling headphones.",
    price: 199.99,
    stock: 5,
    category: "Electronics",
    images: [],
  },
  {
    name: "Smart Watch",
    description: "A sleek smartwatch with multiple features.",
    price: 129.99,
    stock: 0,
    category: "Wearables",
    images: [],
  },
]

function ProductListPage() {
  const theme = useTheme();
  return (
    <Container sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        id="seller-sign-up-modal" 
        sx={{fontWeight : 900, 
        display: "flex", 
        justifyContent: "center", 
        width: "100%", 
        mt:1, 
        mb : 2, 
        color: theme.palette.primary.main,
        }} 
        gutterBottom
      >
        PRODUCTS
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={3}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Box>
    </Container>
  );
}

export default ProductListPage;