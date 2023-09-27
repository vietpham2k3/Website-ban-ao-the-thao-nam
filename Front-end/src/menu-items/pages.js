// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'san-pham',
  title: 'Sản phẩm',
  type: 'group',
  children: [
    {
      id: 'san-pham',
      title: 'Quản lý sản phẩm',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'san-pham',
          title: 'Sản phẩm',
          type: 'item',
          url: '/san-pham/chi-tiet-san-pham',
          breadcrumbs: false
        },
        {
          id: 'mau-sac',
          title: 'Màu sắc',
          type: 'item',
          url: '/san-pham/mau-sac',
          breadcrumbs: false
        },
        {
          id: 'kich-co',
          title: 'Kích cỡ',
          type: 'item',
          url: '/san-pham/kich-co',
          breadcrumbs: false
        },
        {
          id: 'co-ao',
          title: 'Cổ áo',
          type: 'item',
          url: '/san-pham/co-ao',
          breadcrumbs: false
        },
        {
          id: 'chat-lieu',
          title: 'Chất liệu',
          type: 'item',
          url: '/san-pham/chat-lieu',
          breadcrumbs: false
        },
        {
          id: 'loai-san-pham',
          title: 'Loại sản phẩm',
          type: 'item',
          url: '/san-pham/loai-san-pham',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
