import { Component, ReactNode } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { history } from 'utils/history';
import PageLayout from 'pages/PageLayout';
import CategoryPage from 'pages/Category';
import ProductPage from 'pages/Product';
import CartPage from 'pages/Cart';

class AppRouter extends Component {
  render(): ReactNode {
    return (
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<CategoryPage />} />
            <Route path="category/:cat" element={<CategoryPage />} />
            <Route path="item/:pid" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    );
  }
}

export default AppRouter;
