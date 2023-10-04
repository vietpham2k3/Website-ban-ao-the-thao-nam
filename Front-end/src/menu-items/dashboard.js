// assets
import { IconDashboard, IconShoppingCart, IconShirt } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconShirt, IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'don-hang',
  title: 'Đơn hàng',
  type: 'group',
  children: [
    {
      id: 'don-hang',
      title: 'Quản lý đơn hàng',
      type: 'item',
      url: '/don-hang',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
