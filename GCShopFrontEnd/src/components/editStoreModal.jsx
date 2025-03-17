import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";



const EditStoreModal = ({ open, handleClose, sellerData, handleChange, handleSave }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 450,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" id="seller-sign-up-modal" sx={{fontWeight : 900, display: "flex", justifyContent: "center", width: "100%", mt:1}} gutterBottom>
          Edit Store Details
        </Typography>

        <TextField
          label="Store Name"
          name="storeName"
          value={sellerData.storeName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Owner Name"
          name="ownerName"
          value={sellerData.ownerName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          value={sellerData.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={sellerData.contactNumber}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Operating Hours"
          name="operatingHours"
          value={sellerData.operatingHours}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          fullWidth
          sx={{
            mt: 2,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditStoreModal;
