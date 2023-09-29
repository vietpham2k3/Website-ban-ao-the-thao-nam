// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'hoa-don',
  title: 'Hoá đơn',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Quản lý đơn hàng',
      type: 'item',
      url: '/don-hang',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
