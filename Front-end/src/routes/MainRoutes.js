import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MauSac from 'views/mausac/mau-sac';
import AddMauSac from 'views/mausac/addMS';
import UpdateMS from 'views/mausac/updateMS';
import DonHang from 'views/donhang/don-hang';
import DonHangCT from 'views/donhang/don-hang-chi-tiet';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
const AddChiTietSanPham = Loadable(lazy(() => import('views/san-pham/AddSanPham')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/don-hang',
      element: <DonHang />
    },
    {
      path: '/don-hang/print-excel',
      element: <DonHang />
    },
    {
      path: '/don-hang/chi-tiet/:id',
      element: <DonHangCT />
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
          element: <AddChiTietSanPham />
        },
        {
          path: 'mau-sac',
          element: <MauSac/>
        },
        {
          path: 'mau-sac/add',
          element: <AddMauSac/>
        },
        {
          path: 'mau-sac/detail/:id',
          element: <UpdateMS/>
        },
        {
          path: 'mau-sac/update/:id',
          element: <UpdateMS/>
        },
        {
          path: 'mau-sac/delete/:id',
          element: <MauSac/>
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
