import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MauSac from 'views/mausac/mau-sac';
import AddMauSac from 'views/mausac/addMS';
import UpdateMS from 'views/mausac/updateMS';
import DonHang from 'views/donhang/don-hang';
import DonHangCT from 'views/donhang/don-hang-chi-tiet';
//chatlieu

import UpdateCL from 'views/chat-lieu/UpdateChatLieu';
// cổ áo
import AddCoAo from 'views/co-ao/addCoAo';
import UpdateCA from 'views/co-ao/UpdateCoAo';
import CoAo from 'views/co-ao/coAo';
import NhaSanXuat from 'views/nha-san-xuat/NSX';
import AddNSX from 'views/nha-san-xuat/NSXadd';
import UpdateNSX from 'views/nha-san-xuat/NSXupdate';

//
import AddKichCo from 'views/kich-co/addKichCo';
import BanHangTaiQuay from 'views/ban-hang-tai-quay/BanHangTaiQuay';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//chatlieu
const AddChatLieu = Loadable(lazy(() => import('views/chat-lieu/addchatlieu')));
const ChatLieu = Loadable(lazy(() => import('views/chat-lieu/chatlieu')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
const AddChiTietSanPham = Loadable(lazy(() => import('views/san-pham/AddSanPham')));
const UpdateSanPham = Loadable(lazy(() => import('views/san-pham/UpdateSanPham')));
// ==============================|| MAIN ROUTING ||============================== //

// Khuyen Mai
const KhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/khuyen-mai')));
const AddKhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/add')));
const UpdateKhuyenMai = Loadable(lazy(() => import('views/khuyen-mai/update')));

//Khách Hàng
const KhachHang = Loadable(lazy(() => import('views/khach-hang/index')));
const AddKhachHang = Loadable(lazy(() => import('views/khach-hang/addKhachHang')));
const UpdateKhachHang = Loadable(lazy(() => import('views/khach-hang/UpdateKhachHang')));

// Nhân Viên
const NhanVien = Loadable(lazy(() => import('views/nhanvien/NhanVien')));
const AddNhanVien = Loadable(lazy(() => import('views/nhanvien/addNhanVien')));
const UpdateNhanVien = Loadable(lazy(() => import('views/nhanvien/UpdateNhanVien')));

// ==============================|| MAIN ROUTING ||============================== //

//Loại Sản Phẩm
const LoaiSanPham = Loadable(lazy(() => import('views/loaisanpham/loaisanpham')));
const UpdateLSP = Loadable(lazy(() => import('views/loaisanpham/UpdateLSP')));
const AddLSP = Loadable(lazy(() => import('views/loaisanpham/AddLSP')));
// ==============================|| MAIN ROUTING ||============================== //

// kich co
const KichCo = Loadable(lazy(() => import('views/kich-co/KichCo')));
const UpdateKC = Loadable(lazy(() => import('views/kich-co/UpdateKichCo')));

// import { Navigate } from 'react-router';
// const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    //đơn hàng
    {
      path: '/don-hang',
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
          path: 'chi-tiet-san-pham/detail/:id/:idSP',
          element: <UpdateSanPham />
        },
        //màu sắc
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
        //kichco
        {
          path: 'kich-co',
          element: <KichCo />
        },
        {
          path: 'kich-co/add',
          element: <AddKichCo />
        },
        {
          path: 'kich-co/update/:id',
          element: <UpdateKC />
        },
        {
          path: 'kich-co/delete/:id',
          element: <KichCo />
        },
        {
          path: 'kich-co/detail/:id',
          element: <UpdateKC />
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

        //Loại Sản Phẩm
        {
          path: 'loai-san-pham',

          element: <LoaiSanPham />
        },
        //Nha San Xuat
        {
          path: 'nha-san-xuat',
          element: <NhaSanXuat />
        },
        {
          path: 'nha-san-xuat/add',
          element: <AddNSX />
        },
        {
          path: 'nha-san-xuat/detail/:id',
          element: <UpdateNSX />
        },
        {
          path: 'nha-san-xuat/update/:id',
          element: <UpdateNSX />
        },
        {
          path: 'loai-san-pham/add',
          element: <AddLSP />
        },
        {
          path: 'loai-san-pham/detail/:id',
          element: <UpdateLSP />
        },
        {
          path: 'loai-san-pham/update/:id',
          element: <UpdateLSP />
        },
        {
          path: 'loai-san-pham/delete/:id',
          element: <LoaiSanPham />
        }
        //====================
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
    // {
    //   path: '/dia-chi/detail/:id',
    //   element: <UpdateKhachHang />
    // },
    {
      path: '/khach-hang/update/:id',
      element: <UpdateKhachHang />
    },

    //Nhân Viên
    {
      path: '/nhan-vien/add',
      element: <AddNhanVien />
    },
    {
      path: '/nhan-vien',
      element: <NhanVien />
    },
    {
      path: '/nhan-vien/detail/:id',
      element: <UpdateNhanVien />
    },
    {
      path: '/nhan-vien/update/:id',
      element: <UpdateNhanVien />
    },

    //============//
    {
      path: '/thong-ke',
      element: <DashboardDefault />
    },
    // Bán hàng tại quầy
    {
      path: '/ban-hang-tai-quay',
      element: <BanHangTaiQuay />
    }
  ]
};

export default MainRoutes;
