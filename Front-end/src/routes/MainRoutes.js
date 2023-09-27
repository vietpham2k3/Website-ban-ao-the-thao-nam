import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/don-hang',
      element: <DashboardDefault />
    },
    {
      path: '/san-pham',
      children: [
        {
          path: 'chi-tiet-san-pham',
          element: <ChiTietSanPham />
        },
        {
          path: 'chi-tiet-san-pham/add',
          element: <ChiTietSanPham />
        },
        {
          path: 'mau-sac',
          element: <UtilsTypography />
        },
        {
          path: 'kich-co',
          element: <DashboardDefault />
        },
        {
          path: 'co-ao',
          element: <DashboardDefault />
        },
        {
          path: 'chat-lieu',
          element: <DashboardDefault />
        },
        {
          path: 'loai-san-pham',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/voucher',
      element: <UtilsColor />
    },
    {
      path: '/nhan-vien',
      element: <UtilsShadow />
    },
    {
      path: '/khach-hang',
      element: <UtilsTablerIcons />
    },
    {
      path: '/thong-ke',
      element: <UtilsMaterialIcons />
    }
  ]
};

export default MainRoutes;
