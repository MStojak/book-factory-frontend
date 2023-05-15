import React from 'react';
import '../styles/layouts/_footer.scss';

const AppFooter = () => {
  return (
    <div className="flex h-full justify-content-center">
      <div className="flex flex-column sm:flex-row justify-content-between layout-footer align-items-center">
        <span className="font-medium ml-2">© BOOK FACTORY 2023</span>
      </div>
    </div>
  );
};

export default AppFooter;
