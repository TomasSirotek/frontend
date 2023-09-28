import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Pages',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Dashboard', route: '/dashboard/home' },
          ],
        },
      ],
    },
    {
      group: 'Management',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Overview',
          route: '/overview',
          children: [
            { label: 'Boxes Management', route: '/dashboard/boxes' },
            { label: 'Orders', route: '/dashboard/orders' },
          ],
        },
      ],
    },
    {
      group: 'Features',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/shield-check.svg',
          label: 'Box Recognition Model',
          route: '/ai',
        }
      ],
    },
  ];
}
