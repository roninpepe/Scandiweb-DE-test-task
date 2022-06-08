import Header from 'components/Header';
import ModalWindowLayout from 'components/Modal/WindowLayout';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';

class PageLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <Outlet />
        <ModalWindowLayout />
      </>
    );
  }
}

export default PageLayout;
