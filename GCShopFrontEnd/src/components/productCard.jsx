import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, p: 2 }}>

      <CardMedia
        component="img"
        height="200"
        image={product.images?.[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"}
        alt={product.name}
        sx={{ borderRadius: 2 }}
      />


      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Category: {product.category}
        </Typography>
      </CardContent>


      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2, width: "90%" }}
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </Button>
    </Card>
  );
}

export default ProductCard;
