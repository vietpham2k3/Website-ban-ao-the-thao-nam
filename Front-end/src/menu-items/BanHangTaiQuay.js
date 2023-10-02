// assets
import { IconDashboard, IconShoppingCart, IconShirt } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconShirt, IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const BanHangTaiQuay = {
  id: 'ban-hang-tai-quay',
  title: 'Bán hàng tại quầy',
  type: 'group',
  children: [
    {
      id: 'ban-hang-tai-quay',
      title: 'Bán hàn tại quầy',
      type: 'item',
      url: '/ban-hang-tai-quay',
      icon: icons.IconDashboard
    }
  ]
};

export default BanHangTaiQuay;
