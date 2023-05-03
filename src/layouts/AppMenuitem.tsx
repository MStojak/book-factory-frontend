import { NavLink } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/MenuContext';

const AppMenuitem = (props: any) => {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);

  const item = props.item;
  const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
  const isActiveRoute = item.to;
  const active = activeMenu === key || activeMenu.startsWith(key + '-');

  useEffect(() => {
    if (item.to) {
      if (setActiveMenu) {
        setActiveMenu(key);
      }
    }
  }, []);

  const itemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item.items) {
      if (setActiveMenu) {
        setActiveMenu(active ? props.parentKey : key);
      }
    } else {
      if (setActiveMenu) {
        setActiveMenu(key);
      }
    }
  };

  const subMenu = item.items && item.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? true : active}
      key={item.label}>
      <ul>
        {item.items.map((child: any, i: number) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    // Showing sidebar items depending on admin or user role
    <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
      {item.to && item.visible !== false ? (
        <NavLink
          to={item.to}
          replace={item.replaceUrl}
          target={item.target}
          onClick={(e) => itemClick(e)}
          className={classNames(item.class, 'p-ripple', { 'active-route': isActiveRoute })}
          tabIndex={0}>
          <i className={classNames('layouts-menuitem-text-sidebar', item.icon)}></i>
          <span className="layout-menuitem-text-sidebar">{item.label}</span>
          {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
          <Ripple />
        </NavLink>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
