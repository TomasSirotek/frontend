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
            { label: 'Home', route: '/dashboard/home' },
            { label: 'Boxes Management', route: '/dashboard/boxes' },
          ],
        },
      ],
    },
  ];
}
