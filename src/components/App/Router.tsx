import { Component } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { history } from 'utils/history';
import PageLayout from 'pages/PageLayout';
import Category from 'pages/Category';
import PDP from 'pages/PDP';
import Cart from 'pages/Cart';

class AppRouter extends Component {
  render() {
    return (
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Category />} />
            <Route path="category" element={<Category />} />
            <Route path="itemy/:pid" element={<PDP />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </HistoryRouter>
    );
  }
}

export default AppRouter;
