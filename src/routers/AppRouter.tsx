import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import { HashRouter } from 'react-router-dom';
import Layout from '../layouts/layout';
import { LayoutProvider } from '../layouts/context/LayoutContext';
import '../styles/themes/book-factory-theme/theme.css';
import '../styles/layout/layout.scss';
import 'primeflex/primeflex.css';

const AppRouter = () => {
  return (
    <HashRouter>
      <LayoutProvider>
        <Layout />
      </LayoutProvider>
    </HashRouter>
  );
};
export default AppRouter;
