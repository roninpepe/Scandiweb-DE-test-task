import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType, ReactNode } from 'react';
import {
  EDLEvent,
  ESize,
  IAppContext,
  IDLItem,
} from 'types/scandiweb-de-test-task.d';
import CartItem from './Cart/Item';

class Cart extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  list = 'Cart Page';

  getTotalPrice = (): number =>
    this.context.cart.reduce(
      (accumulator, item) => accumulator + item.amount * item.price,
      0
    );

  getQuantity = (): number =>
    this.context.cart.reduce(
      (accumulator, item) => accumulator + item.amount,
      0
    );

  getEcommerceCheckoutItem = (): IDLItem => ({
    event: EDLEvent.CHECKOUT,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      checkout: {
        actionField: {
          step: 1,
          option: this.list,
        },
        products: this.context.cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          brand: item.brand,
          variant: `${item.selectedOptions?.size ?? ''}`,
          category: item.category,
          quantity: item.amount,
          dimension1: `${item.id}${
            item.selectedOptions?.size ? '-' + item.selectedOptions.size : ''
          }${
            item.selectedOptions?.color
              ? '-' + item.selectedOptions.color.toUpperCase()
              : ''
          }`,
          dimension2: `${
            item.selectedOptions?.color
              ? item.selectedOptions.color.charAt(0).toUpperCase() +
                item.selectedOptions.color.substring(1) +
                ' '
              : ''
          }${item.brand} ${item.name}${
            item.selectedOptions?.size
              ? ' ' + ESize[item.selectedOptions.size]
              : ''
          }`,
        })),
      },
    },
  });

  checkoutClickEvent = () => {
    console.log(this.getEcommerceCheckoutItem()); // TODO: dataLayer support
  };

  render(): ReactNode {
    return (
      <div className="page__cart cart">
        <div className="cart__title">Cart</div>
        <div className="cart__items">
          {this.context.cart.map((v, i) => (
            <CartItem key={`${i}`} position={i} item={v} list={this.list} />
          ))}
        </div>
        <div className="cart__form">
          <div className="cart__info">
            <div className="cart__info-labels">
              <div className="cart__tax">Tax 21%:</div>
              <div className="cart__quantity">Quantity: </div>
              <div className="cart__total">Total: </div>
            </div>
            <div className="cart__info-values">
              <div className="cart__info-value">
                {this.context.settings.currency.currencySymbol}
                {(
                  this.getTotalPrice() *
                  this.context.settings.currency.currency *
                  0.21
                ).toFixed(2)}
              </div>
              <div className="cart__info-value">{this.getQuantity()}</div>
              <div className="cart__info-value">
                {this.context.settings.currency.currencySymbol}
                {(
                  this.getTotalPrice() * this.context.settings.currency.currency
                ).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="cart__order" onClick={this.checkoutClickEvent}>
            Order
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
