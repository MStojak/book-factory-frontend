import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/MenuContext';

interface SideMenuItem {
  label: string;
  icon?: string;
  to?: string;
  items?: Array<SideMenuItem>;
  badge?: string;
  disabled?: boolean;
  visible?: boolean;
  command?: any;
}

const AppMenu = () => {
  const user: Array<SideMenuItem> = [
    {
      label: 'User',
      items: [{ label: 'Pregled', icon: 'pi pi-wrench', to: `/user/overview` }]
    }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        <>
          {user.map((item: SideMenuItem, i: number) => (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ))}
        </>
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
