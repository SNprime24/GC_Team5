import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import { Box, Typography, Button } from "@mui/material";

import ToolbarAction from './components/toolBarAction';
import LoginModal from './components/loginModal';
import { StudentSignUpModal,SellerSignUpModal } from './components/SignUpModal';
import { initialNavigation, customerNavigation, sellerNavigation } from './navigation/navigation';
import  AppTitle  from "./components/appTitle";

import CartPage from './pages/customer/cartPage';
import OrdersPage from './pages/customer/orderPage';
import ProductListPage from './pages/customer/productList';

import AnalysisPage from './pages/seller/analysis';
import CurrentOrderPage from './pages/seller/currentOrders';
import InventoryPage from './pages/seller/inventory';
import ManagementPage from './pages/seller/management';
import PastOrderPage from './pages/seller/pastOrders';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { server } from './assets/config';
import { userExists, userNotExists } from './redux/reducers/auth';
import axios from 'axios'


const THEME = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});




function SidebarFooter({ mini, user, onProfileChange, onLogout }) {

  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="bold">
          {user?.name || "Guest User"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{opacity : "50%"}}>
          {user?.email || "guest@example.com"}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Button variant="outlined" size="small" onClick={onProfileChange}>
          Change Profile
        </Button>
        <Button variant="contained" size="small" color="error" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}



function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
        dispatch(userExists(JSON.parse(storedUser))); // ✅ Restore Redux state from localStorage
    } else {
        axios
            .get(`${server}/api/v1/customer/me`, { withCredentials: true })
            .then(({ data }) => {
                dispatch(userExists(data.customer));
                localStorage.setItem("user", JSON.stringify(data.customer)); // ✅ Store user in localStorage
            })
            .catch(() => {
                dispatch(userNotExists());
                localStorage.removeItem("user"); // ✅ Remove user if request fails
            });
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loginModal,setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [sellerSignUpModal,setSellerSignUpModal] = useState(false);

  const openLoginModal = () =>{
    setLoginModal(true);
    navigate("/login");
  };

  const closeLoginModal = () =>{
    setLoginModal(false);
    navigate("/");
  }

  const openSignUpModal = () =>{
    setSignUpModal(true);
    navigate("/signup");
  }

  const closeSignUpModal = ()=>{
    setSignUpModal(false);
    navigate("/");
  }

  const openSellerSignUpModal = () => {
    closeSignUpModal();
    setSellerSignUpModal(true);
    navigate("/signup");
  }
  const closeSellerSignUpModal = () => {
    setSellerSignUpModal(false);
    navigate("/");
  }

  useEffect(() => {
    if (pathname === "/login") {
      setLoginModal(true);
    } else {
      setLoginModal(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/signup") {
      setSignUpModal(true);
    } else {
      setSignUpModal(false);
    }
  }, [pathname]);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/customer/logOut`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
      navigate("/");
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
      <AppProvider navigation={(user?.role === "customer") ? customerNavigation : (user?.role==="seller")? sellerNavigation : initialNavigation} theme={THEME}>
      <DashboardLayout
        slots={{
          appTitle: AppTitle,
          toolbarActions: () => <ToolbarAction openLoginModal={openLoginModal} openSignUpModal={openSignUpModal} user={user}/>,
          sidebarFooter: () => <SidebarFooter onLogout={handleLogOut}/>,
        }}
      >
        {/* {user.role === "seller" && <Routes>
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/currentorders" element={<CurrentOrderPage />} />
          <Route path="/pastorders" element={<PastOrderPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>}

        {user.role === "customer" && <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>} */}
        <Routes>
          <Route path="/" element={<ProductListPage />} />
            
            {user && user?.role==="customer" && <Route path="/products" element={<ProductListPage />} />}
            {user && user?.role==="customer" && <Route path="/cart" element={<CartPage />} />}
            {user && user?.role==="customer" && <Route path="/orders" element={<OrdersPage />} />}

            {user && user?.role==="seller" && <Route path="/management" element={<ManagementPage />} />}
            {user && user?.role==="seller" && <Route path="/inventory" element={<InventoryPage />} />}
            {user && user?.role==="seller" && <Route path="/currentorders" element={<CurrentOrderPage />} />}
            {user && user?.role==="seller" && <Route path="/pastorders" element={<PastOrderPage />} />}
            {user && user?.role==="seller" && <Route path="/analysis" element={<AnalysisPage />} />}
            <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </DashboardLayout>
      <LoginModal open={loginModal} handleClose={closeLoginModal} />
      <StudentSignUpModal open ={signUpModal} handleClose={closeSignUpModal} openSellerSignUpModal={openSellerSignUpModal} />
      <SellerSignUpModal open ={sellerSignUpModal} handleClose={closeSellerSignUpModal} />
    </AppProvider>

    // </Router>
  );
}

export default App;

