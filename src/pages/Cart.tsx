import Cart from 'components/Cart';
import { Component } from 'react';

class CartPage extends Component {
  render() {
    return (
      <div className="app__page page page_cart">
        <Cart />
      </div>
    );
  }
}

export default CartPage;
