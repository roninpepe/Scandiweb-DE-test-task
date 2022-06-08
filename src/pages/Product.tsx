import Product from 'components/Product';
import { Component } from 'react';

class ProductPage extends Component {
  render() {
    return (
      <div className="app__page page page_product">
        <Product />
      </div>
    );
  }
}

export default ProductPage;
