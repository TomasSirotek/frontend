import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Pages',
      separator: false,
      items: [
        {
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Dashboard', route: '/dashboard' },
          ],
        },
      ],
    },
    {
      group: 'Management',
      separator: true,
      items: [
        {
          label: 'Overview',
          route: '/overview',
          children: [
            { label: 'Boxes Management', route: '/dashboard' },
            { label: 'Orders', route: '/dashboard' },
          ],
        },
      ],
    },
    {
      group: 'Features',
      separator: false,
      items: [
        {
          label: 'Box Recognition Model',
          route: '/ai',
        }
      ],
    },
  ];
}