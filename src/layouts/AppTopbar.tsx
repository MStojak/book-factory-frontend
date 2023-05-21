import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LOGO from '../resources/Book.png';
import { Image } from 'primereact/image';
import '../styles/layouts/_topbar.scss';

const AppTopbar = forwardRef((props, ref) => {
  const topbarmenuRef = useRef(null);

  useImperativeHandle(ref, () => ({
    topbarmenu: topbarmenuRef.current
  }));

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
          {/*<Button type="button" label="Naslovna" onClick={doNothing} />*/}
        </div>
      </div>
    </div>
  );
});
AppTopbar.displayName = 'AppTopbar';
export default AppTopbar;
