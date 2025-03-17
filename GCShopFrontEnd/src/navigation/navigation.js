import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HandymanIcon from '@mui/icons-material/Handyman';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HistoryIcon from '@mui/icons-material/History';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export const initialNavigation = []

export const customerNavigation = [
    {
      kind: 'header',
      title: 'Products',
    },
    {
      segment : 'products',
      title: 'Products List',
      icon : <StoreIcon />
    },
    {
      kind : "divider",
    },
    {
      kind: 'header',
      title: 'Carts and Orders',
    },
    {
      segment: 'cart',
      title: 'Cart',
      icon: <ShoppingCartIcon />,
    },
    {
      segment: 'orders',
      title: 'Orders',
      icon: <ShoppingBagIcon />,
    }
  ]
  
export const sellerNavigation = [
    {
      kind: 'header',
      title: 'Shop Management',
    },
    {
      segment : 'management',
      title: 'Management',
      icon : <HandymanIcon />
    },
    {
      segment: 'inventory',
      title: 'Inventory Update',
      icon: <InventoryIcon />,
    },
    {
      kind : "divider",
    },
    {
      kind: 'header',
      title: 'Orders Management',
    },
    {
      segment : 'currentorders',
      title: 'Current Orders',
      icon : <NotificationsActiveIcon />
    },
    {
      segment: 'pastorders',
      title: 'Past Orders',
      icon: <HistoryIcon />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Order Analysis',
    },
    {
      segment : 'analysis',
      title: 'Analysis',
      icon : <QueryStatsIcon />
    },
]
