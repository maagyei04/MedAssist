import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from './Drawer/DrawerContent/Navigation';
import Loader from '../../../components/common/Loader';
import Breadcrumbs from '../../../components/common/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from '../../../api/menu';

import ScrollToTop from '../../common/ScrollToTop';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  const handleDrawer = useCallback(() => {
    handlerDrawerOpen(!downXL);
  }, [downXL]);

  useEffect(() => {
    handleDrawer();
  }, [handleDrawer]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <ScrollToTop />
        <Outlet />
      </Box>
    </Box>
  );
}
