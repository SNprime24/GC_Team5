import React,{ useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import toast from 'react-hot-toast';
import { server } from "../assets/config";
import { userExists } from '../redux/reducers/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function LoginModal({ open, handleClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>  setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
        const response = await fetch(`${server}/api/v1/customer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        // Parse response JSON
        const resData = await response.json();
        console.log(resData);

        // If the response is not OK, set the error message and throw an error
        if (!response.ok) {
            throw new Error(resData.message || "Error while loading the data...");
        }

        // If the response is successful and `resData.success` is true
        if (resData.success) {
            toast.success(resData.message);
            dispatch(userExists(resData.customer));
            navigate("/");
        } else {
            // If `resData.success` is false, set an error message
            toast.error(resData.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
        toast.error(error.message || "An unexpected error occurred");
        navigate("/");
    }

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="sign-in-modal">
      <Box
        sx={{
            ...modalStyle,
            bgcolor: theme.palette.background.default,
        }}
      >
        <Typography variant="h3" id="sign-in-modal" gutterBottom>
          Login
        </Typography>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Login
        </Button>

      </Box>
    </Modal>
  );
}

export default LoginModal;