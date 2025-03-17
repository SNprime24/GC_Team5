import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import EditStoreModal from "../../components/editStoreModal";

const SellerManagementPage = () => {
  const theme = useTheme();

  const [sellerData, setSellerData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    address: "",
    contactNumber: "",
    operatingHours: "",
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSellerData({
        storeName: "Tech World",
        ownerName: "John Doe",
        email: "johndoe@example.com",
        address: "123 Tech Street, New York",
        contactNumber: "1234567890",
        operatingHours: "9 AM - 9 PM",
      });
    }, 1000);
  }, []);

  const [open, setOpen] = useState(false);

  const openEditStoreModal = () => setOpen(true);
  const closeEditStoreModal = () => setOpen(false);
  const handleChange = (e) => setSellerData({ ...sellerData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log("Updated Seller Data: ", sellerData);
    closeEditStoreModal();
    // API call to update the database
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {/* Store Management Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 5,
          color: theme.palette.primary.main,
          letterSpacing: 1.5,
        }}
      >
        Store Management
      </Typography>

      {/* Store Details Card */}
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
          transition: "all 0.3s",
          "&:hover": { boxShadow: theme.shadows[6] },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 3, color: theme.palette.secondary.main }}
        >
          Store Information
        </Typography>

        <Box sx={{ mb: 3 }}>
          {Object.entries(sellerData).map(([key, value]) => (
            <Typography
              key={key}
              variant="body1"
              sx={{
                mb: 2,
                fontSize: "1rem",
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              <strong style={{ color: theme.palette.text.secondary, opacity:"50%"}}>
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
              </strong>{" "}
              {value}
            </Typography>
          ))}
        </Box>

        {/* Edit Details Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          sx={{
            mt: 3,
            textTransform: "none",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: "1rem",
            px: 3,
            py: 1.2,
            transition: "0.3s",
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
              transform: "scale(1.05)",
            },
          }}
          onClick={openEditStoreModal}
        >
          Edit Details
        </Button>
      </Paper>

      {/* Edit Store Modal */}
      <EditStoreModal
        open={open}
        handleClose={closeEditStoreModal}
        sellerData={sellerData}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Container>
  );
};

export default SellerManagementPage;
