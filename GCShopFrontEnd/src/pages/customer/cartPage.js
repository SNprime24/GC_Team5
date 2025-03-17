import React,{ useState } from "react";
import { Container, Box, Typography, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CartBar from "../../components/cartBar";

const imagePlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s";

const initialCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
];

function CartPage() {
  const theme = useTheme();
  const [cart, setCart] = useState(initialCart);

  // Function to update quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 1,
          mb: 2,
          color: theme.palette.primary.main,
        }}
        gutterBottom
      >
        YOUR CART
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartBar item = {item} updateQuantity = {updateQuantity} removeItem = {removeItem}/>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Your cart is empty.
          </Typography>
        )}
      </Box>

      {/* Total Price and Checkout */}
      {cart.length > 0 && (
        <Box display="flex" justifyContent="space-between" mt={3} p={2} sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default CartPage;