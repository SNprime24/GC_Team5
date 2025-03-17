import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import EditProductModal from "../../components/editProductModal";

const imagePlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s";

// Mock Product Data
const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality noise-canceling wireless headphones with Bluetooth 5.0.",
    price: 199.99,
    stock: 15,
    category: "Electronics",
    images: [],
  },
  {
    id: 2,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with RGB lighting and programmable buttons.",
    price: 49.99,
    stock: 30,
    category: "Accessories",
    images: [],
  },
  {
    id: 3,
    name: "Smart Watch",
    description: "Waterproof smartwatch with heart rate monitoring and GPS tracking.",
    price: 129.99,
    stock: 20,
    category: "Wearables",
    images: [],
  },
];

const InventoryPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleOpen = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleDelete = (id) => setProducts((prev) => prev.filter((product) => product.id !== id));
  
  const handleSave = (product) => {
    if (product.id) setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    else setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    
    

    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 5,
          color: "primary.main",
          letterSpacing: 1,
        }}
      >
        Inventory Management
      </Typography>

      <Box textAlign="right" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => handleOpen(null)}
          sx={{ borderRadius: 3, fontWeight: "bold", px: 3 }}
        >
          Add Product
        </Button>
      </Box>

      <Paper elevation={6} sx={{ p: 3, borderRadius: 4, boxShadow: "0 6px 16px rgba(0,0,0,0.15)", width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Price ($)</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    {/* Product Image */}
                    <TableCell>
                      <Avatar
                        src={product.images?.[0] || imagePlaceholder }
                        alt={product.name}
                        sx={{ width: 56, height: 56, borderRadius: 1 }}
                      />
                    </TableCell>

                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton color="primary" onClick={() => handleOpen(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(product.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 2, color: "text.secondary" }}>
                    No products available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EditProductModal 
        open={open} 
        handleClose={handleClose} 
        product={currentProduct} 
        onSave={handleSave} 
      />
    </Container>
  );
};

export default InventoryPage;
