import { Component } from 'react';
import HeaderCategory from 'components/Header/Category';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import HeaderCart from './Header/Cart';
import HeaderCurrency from './Header/Currency';

class Header extends Component {
  render() {
    return (
      <div className="app__header header">
        <div className="header__cont header__cont_left">
          <HeaderCategory location={window.location}>women</HeaderCategory>
          <HeaderCategory location={window.location}>men</HeaderCategory>
          <HeaderCategory location={window.location}>kids</HeaderCategory>
        </div>
        <div className="header__cont header__cont_center">
          <a className="header__cart-link" href="../cart">
            <Logo />
          </a>
        </div>
        <div className="header__cont header__cont_right">
          <HeaderCurrency />
          <HeaderCart />
        </div>
      </div>
    );
  }
}

export default Header;
