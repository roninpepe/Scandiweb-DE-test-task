import Header from 'components/Header';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout: FC = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default PageLayout;
