import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useSaveProductsMutation } from "../redux/api/api";

const EditProductModal = ({ open, handleClose, product, onSave }) => {
  const { user } = useSelector((state) => state.auth);
  const [saveProduct] = useSaveProductsMutation();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        images: [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSave = () => {
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    });

    saveProduct({ product, sellerId: user._id });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{fontWeight : 900, display: "flex", justifyContent: "center", width: "100%", mt:1}} variant="h4">{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Product Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth />
        <TextField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" fullWidth />
        <TextField label="Stock" name="stock" value={formData.stock} onChange={handleChange} type="number" fullWidth />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}> Product Images </Typography>
          {formData.images.map((image, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <TextField
                label={`Image URL ${index + 1}`}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                fullWidth
              />
              <IconButton color="error" onClick={() => handleRemoveImage(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={handleAddImage} variant="outlined" color="primary">
            Add Image
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error" variant="outlined"> Cancel </Button>
        <Button onClick={handleSave} variant="contained" color="success"> {product ? "Save Changes" : "Add Product"} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
