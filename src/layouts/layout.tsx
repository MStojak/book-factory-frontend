import { classNames, DomHandler } from 'primereact/utils';
import React, { useContext, useEffect } from 'react';
import AppFooter from './AppFooter';
import AppTopbar from './AppTopbar';
import { LayoutContext } from './context/LayoutContext';
import PrimeReact from 'primereact/api';
import MenuRouter from '../routers/MenuRouter';
import '../styles/themes/book-factory-theme/theme.css';

const Layout = () => {
  const { layoutConfig, layoutState } = useContext(LayoutContext);

  layoutState.overlayMenuActive = false;

  useEffect(() => {
    console.log(layoutConfig);
  }, [layoutConfig]);

  useEffect(() => {
    console.log(layoutState);
  }, [layoutState]);

  const blockBodyScroll = () => {
    DomHandler.addClass(
      document.getElementsByClassName(containerClass!).item(0)! as HTMLElement,
      'blocked-scroll'
    );
  };

  useEffect(() => {
    layoutState.staticMenuMobileActive && blockBodyScroll();
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  // useEffect(() => {
  //     location.state.on('routeChangeComplete', () => {
  //         hideMenu();
  //         hideProfileMenu();
  //     });
  // }, []);

  PrimeReact.ripple = true;

  const containerClass = classNames(
    'layouts-wrapper',
    {
      'layout-theme-light': layoutConfig.colorScheme === 'light',
      'layout-theme-dark': layoutConfig.colorScheme === 'dark',
      'layout-overlay': layoutConfig.menuMode === 'overlay',
      'layout-static': layoutConfig.menuMode === 'static',
      'layout-static-inactive':
        layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
      'layout-overlay-active': layoutState.overlayMenuActive,
      'layout-mobile-active': layoutState.staticMenuMobileActive,
      'p-input-filled': true,
      'p-ripple-disabled': true,
      'min-height': '100vh'
    },
    'background'
  );

  return (
    <React.Fragment>
      <header>
        <title>EESTEC</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="EESTEC application" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="EESTEC LC ZAGREB"></meta>
        <meta property="og:description" content="EESTEC LC Zagreb web apliaction" />
        <meta property="og:ttl" content="604800"></meta>
        <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
      </header>

      <div className={containerClass}>
        <AppTopbar />
        <div className="layout-main-container">
          <div className="layout-main background-welcome">
            <MenuRouter />
          </div>
          <AppFooter />
        </div>
        <div className="layout-mask"></div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
