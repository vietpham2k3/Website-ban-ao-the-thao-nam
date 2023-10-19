import { lazy } from 'react';
// project imports
import Loadable from 'ui-component/Loadable';

// login option 3 routing
const TrangChu = Loadable(lazy(() => import('views/home/TrangChu')));
const SanPham = Loadable(lazy(() => import('views/sanpham/SanPham')));
const Detail = Loadable(lazy(() => import('views/sanpham/DetailSanPham')));
const GioHang = Loadable(lazy(() => import('views/giohang/GioHang')));
const CheckOut = Loadable(lazy(() => import('views/checkout/CheckOut')));
const ThankYou = Loadable(lazy(() => import('ui-component/checkout/ThankYou')));
const CheckOutQuick = Loadable(lazy(() => import('views/checkout/CheckOutQuick')));
const Login = Loadable(lazy(() => import('views/login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// import { Navigate } from 'react-router';
// const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/trang-chu',
      element: <TrangChu />
    },
    {
      path: '/san-pham/web',
      element: <SanPham />
    },
    {
      path: '/detail/:id/:idSP/:idMS',
      element: <Detail />
    },
    {
      path: '/gio-hang',
      element: <GioHang />
    },
    {
      path: '/checkout/:id',
      element: <CheckOut />
    },
    {
      path: '/checkoutquick/:id',
      element: <CheckOutQuick />
    },
    {
      path: '/checkout/thankyou',
      element: <ThankYou />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/error',
      element: <Login />
    }
  ]
};

export default AuthenticationRoutes;
