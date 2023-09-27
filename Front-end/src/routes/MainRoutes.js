import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MauSac from 'views/mausac/mau-sac';
import AddMauSac from 'views/mausac/addMS';
import UpdateMS from 'views/mausac/updateMS';
//chatlieu
import ChatLieu from 'views/chat-lieu/chatlieu';
import AddChatLieu from 'views/chat-lieu/addchatlieu';
import UpdateCL from 'views/chat-lieu/UpdateChatLieu';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// Sản phẩm
const ChiTietSanPham = Loadable(lazy(() => import('views/san-pham/SanPham')));
const AddChiTietSanPham = Loadable(lazy(() => import('views/san-pham/AddSanPham')));
// ==============================|| MAIN ROUTING ||============================== //
//chất liệu


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
          element: <ChatLieu />
        },
        {
          path: 'chat-lieu/add',
          element: <AddChatLieu/>
        },
        {
          path: 'chat-lieu/detail/:id',
          element: <UpdateCL/>
        },
        {
          path: 'chat-lieu/update/:id',
          element: <UpdateCL/>
        },
        {
          path: 'chat-lieu/delete/:id',
          element: <ChatLieu/>
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
      path: '/chat-lieu'
    }
  ]
};

export default MainRoutes;
