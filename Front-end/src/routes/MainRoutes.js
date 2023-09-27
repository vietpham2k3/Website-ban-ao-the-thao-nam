import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MauSac from 'views/mausac/mau-sac';
import AddMauSac from 'views/mausac/addMS';
import UpdateMS from 'views/mausac/updateMS';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
const AddChiTietSanPham = Loadable(lazy(() => import('views/san-pham/AddSanPham')));
// ==============================|| MAIN ROUTING ||============================== //

// Khuyen Mai
const KhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/khuyen-mai')));
const AddKhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/add')));
const UpdateKhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/update')));

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
          element: <AddChiTietSanPham />
        },
        {
          path: 'mau-sac',
          element: <MauSac />
        },
        {
          path: 'mau-sac/add',
          element: <AddMauSac />
        },
        {
          path: 'mau-sac/detail/:id',
          element: <UpdateMS />
        },
        {
          path: 'mau-sac/update/:id',
          element: <UpdateMS />
        },
        {
          path: 'mau-sac/delete/:id',
          element: <MauSac />
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
    //khuyen mai
    {
      path: '/voucher',
      element: <KhuyenMai />
    },
    {
      path: '/voucher/add',
      element: <AddKhuyenMai />
    },
    {
      path: '/voucher/update/:id',
      element: <UpdateKhuyenMai />
    },
    {
      path: '/voucher/detail/:id',
      element: <UpdateKhuyenMai />
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
