import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Pages',
      separator: false,
      items: [
        {
          icon: 'heroBuildingStorefront',
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
          icon:'heroFolderOpen',
          label: 'Overview',
          route: '/management',
          children: [
            { label: 'Boxes Management', route: '/boxes' },
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
          icon: 'heroPhoto',
          label: 'Box Recognition Model',
          route: '/ai',
        }
      ],
    },
  ];
}