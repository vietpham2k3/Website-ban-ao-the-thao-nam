import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MauSac from 'views/mausac/mau-sac';
import AddMauSac from 'views/mausac/addMS';
import UpdateMS from 'views/mausac/updateMS';
//chatlieu

import UpdateCL from 'views/chat-lieu/UpdateChatLieu';
// cổ áo
import AddCoAo from 'views/co-ao/addCoAo';
import UpdateCA from 'views/co-ao/UpdateCoAo';
import CoAo from 'views/co-ao/coAo';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
//chatlieu
const AddChatLieu = Loadable(lazy(() => import('views/chat-lieu/addchatlieu')));
const ChatLieu = Loadable(lazy(() => import('views/chat-lieu/chatlieu')));
// utilities routing
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
const AddChiTietSanPham = Loadable(lazy(() => import('views/san-pham/AddSanPham')));
// ==============================|| MAIN ROUTING ||============================== //

//Khách Hàng
const KhachHang = Loadable(lazy(() => import('views/khach-hang/index')));
const AddKhachHang = Loadable(lazy(() => import('views/khach-hang/addKhachHang')));
const UpdateKhachHang = Loadable(lazy(() => import('views/khach-hang/UpdateKhachHang')));

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
          element: <AddChiTietSanPham />
        },
        {
          path: 'chi-tiet-san-pham/detail/:id',
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
        //co ao
        {
          path: 'co-ao',
          element: <CoAo />
        },
        {
          path: 'co-ao/add',
          element: <AddCoAo />
        },
        {
          path: 'co-ao/detail/:id',
          element: <UpdateCA />
        },
        {
          path: 'co-ao/update/:id',
          element: <UpdateCA />
        },
        {
          path: 'co-ao/delete/:id',
          element: <CoAo />
        },
        {
          path: 'chat-lieu',
          element: <ChatLieu />
        },
        {
          path: 'chat-lieu/add',
          element: <AddChatLieu />
        },
        {
          path: 'chat-lieu/detail/:id',
          element: <UpdateCL />
        },
        {
          path: 'chat-lieu/update/:id',
          element: <UpdateCL />
        },
        {
          path: 'chat-lieu/delete/:id',
          element: <ChatLieu />
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
    //Khách Hàng
    {
      path: '/khach-hang',
      element: <KhachHang />
    },
    {
      path: '/khach-hang/add',
      element: <AddKhachHang />
    },
    {
      path: '/khach-hang/detail/:id',
      element: <UpdateKhachHang />
    },
    {
      path: '/khach-hang/update/:id',
      element: <UpdateKhachHang />
    },

    //============//
    {
      path: '/thong-ke',
      element: <UpdateKhachHang />
    }
  ]
};

export default MainRoutes;
