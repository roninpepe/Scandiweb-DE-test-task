import CartItem from 'components/Cart/Item';
import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType, ReactNode } from 'react';
import {
  EDLEvent,
  ESize,
  IAppContext,
  IDLItem,
} from 'types/scandiweb-de-test-task.d';

class ModalCart extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  list = 'Cart Modal Window';

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
    const totalItems = this.context.cart.reduce(
      (accumulator, item) => item.amount + accumulator,
      0
    );
    const totalCost =
      this.context.cart.reduce(
        (accumulator, item) => accumulator + item.amount * item.price,
        0
      ) * this.context.settings.currency.currency;

    return (
      <div className="modal-window-layout__modal-cart modal-cart">
        <div className="modal-cart__title-wrapper">
          <span className="modal-cart__title">My Bag</span>, {totalItems} item
          {totalItems !== 1 ? 's' : ''}
        </div>
        <div className="modal-cart__container">
          {totalItems ? (
            <>
              <div className="modal-cart__items">
                {this.context.cart.map((v, i) => (
                  <CartItem
                    key={`${i}`}
                    position={i}
                    item={v}
                    list={this.list}
                  />
                ))}
              </div>
              <div className="modal-cart__total-cost-wrapper">
                <div className="modal-cart__total-cost-label">Total</div>
                <div className="modal-cart__total-cost">
                  {this.context.settings.currency.currencySymbol}
                  {totalCost.toFixed(2)}
                </div>
              </div>
              <div className="modal-cart__buttons">
                <a href="../cart" className="modal-cart__open-cart">
                  View bag
                </a>
                <div
                  className="modal-cart__checkout"
                  onClick={this.checkoutClickEvent}
                >
                  Checkout
                </div>
              </div>
            </>
          ) : (
            <div className="modal-cart__stub">Empty</div>
          )}
        </div>
      </div>
    );
  }
}

export default ModalCart;
