import { Component, Context, ContextType, ReactNode } from 'react';
import { IAppContext } from 'types/scandiweb-de-test-task';
import { AppContext } from 'context/AppContext';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';

class HeaderCart extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  changeModalState = (): void => {
    if (this.context.modal === 'cart') {
      this.context.setModalState(undefined);
    } else {
      this.context.setModalState('cart');
    }
  };

  render(): ReactNode {
    return (
      <div className="header__cart _bright" onClick={this.changeModalState}>
        <Cart />
        {this.context.cart.length ? (
          <div className="header__cart-counter">
            {this.context.cart.reduce(
              (accumulator, item) => item.amount + accumulator,
              0
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default HeaderCart;
