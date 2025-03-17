import { Button, Box } from '@mui/material';
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout';

const ToolbarAction = ({ openLoginModal,openSignUpModal,user }) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
        <ThemeSwitcher/>
      {!user &&
      <Button variant="outlined" color="primary" onClick={openLoginModal}>
        Login
      </Button>
      }
      {!user &&
      <Button variant="contained" color="primary" onClick={openSignUpModal}>
        Sign Up
      </Button>
      }
    </Box>
  );
};

export default ToolbarAction;
