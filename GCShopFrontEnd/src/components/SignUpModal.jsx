import React, { useState } from "react";
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

function SellerSignUpModal({ open, handleClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName : "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Student Sign Up Data:", formData);

    try {
      console.log(formData);
      const response = await fetch(`${server}/api/v1/customer/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const resData = await response.json();


      if (!response.ok) {
          throw new Error(resData.message || "Error while loading the data...");
      }
      
      if (resData.success) {
        toast.success(resData.message);
        navigate("/");
      } 
      else {
        // If `resData.success` is false, set an error message
        toast.error(resData.message);
      }
    }		
    catch (error) {
      console.error("Error during sign up:", error);
      toast.error(error.message || "An unexpected error occurred");
      navigate("/");
    }

    handleClose();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="seller-sign-up-modal">
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography variant="h3" id="seller-sign-up-modal" sx={{fontWeight : 900, display: "flex", justifyContent: "center", width: "100%", mt:1}} gutterBottom>
          Seller Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Store Name"
          name="storeName"
          margin="normal"
          value={formData.storeName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Name"
          name="ownerName"
          margin="normal"
          value={formData.ownerName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Sign Up
        </Button>

      </Box>
    </Modal>
  );
}

function StudentSignUpModal({ open, handleClose, openSellerSignUpModal }) {
    
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber : "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Student Sign Up Data:", formData);

    try {
      console.log(formData);
      const response = await fetch(`${server}/api/v1/customer/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const resData = await response.json();


      if (!response.ok) {
          throw new Error(resData.message || "Error while loading the data...");
      }
      
      if (resData.success) {
        toast.success(resData.message);
        navigate("/");
      } 
      else {
        // If `resData.success` is false, set an error message
        toast.error(resData.message);
      }
    }		
    catch (error) {
      console.error("Error during sign up:", error);
      toast.error(error.message || "An unexpected error occurred");
      navigate("/");
    }

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="student-sign-up-modal">
      <Box
        sx={{
          ...modalStyle,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography variant="h4" id="student-sign-up-modal" sx={{fontWeight : 900, display: "flex", justifyContent: "center", width: "100%", mt:1}} gutterBottom>
          Student Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Roll Number"
          name="rollNumber"
          margin="normal"
          value={formData.rollNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Sign Up
        </Button>
        <Button 
          variant="text" 
          color="secondary" 
          onClick={openSellerSignUpModal} 
          sx={{ display: "flex", justifyContent: "center", width: "100%", mt:1 }}
        >
          Sign up as a Seller
        </Button>
      </Box>
      
    </Modal>
  );
}

export { SellerSignUpModal, StudentSignUpModal };
