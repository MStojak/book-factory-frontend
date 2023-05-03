import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from '../components/Welcome';

const MenuRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to={`/moderna`} />} />
      <Route path={`/moderna`} element={<Welcome />} />
    </Routes>
  </>
);
export default MenuRouter;
