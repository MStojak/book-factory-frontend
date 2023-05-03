import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import LOGO from '../resources/book-factory.jpg';
import { Image } from 'primereact/image';
import '../styles/layout/_topbar.scss';

const AppTopbar = forwardRef((props, ref) => {
  const topbarmenuRef = useRef(null);

  useImperativeHandle(ref, () => ({
    topbarmenu: topbarmenuRef.current
  }));

  const doNothing = () => {
    //console.log('ddd');
  };
  return (
    <div className="layout-top-bar flex align-content-between">
      <div style={{ marginRight: 'auto' }}>
        <NavLink to={`/`} className="layout-top-bar-logo">
          <>
            <span>
              <Image src={LOGO} alt="Image" />
            </span>
          </>
        </NavLink>
      </div>
      <div className="flex align-content-center">
        <div ref={topbarmenuRef}>
          <Button type="button" label="Naslovna" onClick={doNothing} />
        </div>
      </div>
    </div>
  );
});
AppTopbar.displayName = 'AppTopbar';
export default AppTopbar;
