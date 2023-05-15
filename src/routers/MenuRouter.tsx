import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from '../components/login-render-components/Welcome';

const MenuRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to={`/moderna`} />} />
      <Route path={`/moderna`} element={<Welcome />} />
    </Routes>
    <ToastContainer autoClose={2500} />
  </>
);
export default MenuRouter;
