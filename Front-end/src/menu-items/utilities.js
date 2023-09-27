// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'other',
  title: 'Khác',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Voucher',
      type: 'item',
      url: '/voucher',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Nhân viên',
      type: 'item',
      url: '/nhan-vien',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Khách hàng',
      type: 'item',
      url: '/khach-hang',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'thong-ke',
      title: 'Thống kê',
      type: 'item',
      url: '/khach-hang',
      icon: icons.IconWindmill,
      breadcrumbs: false
    }
  ]
};

export default utilities;
