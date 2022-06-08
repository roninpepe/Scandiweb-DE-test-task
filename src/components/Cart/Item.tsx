import { NO_IMAGE_THUMBNAIL } from 'configs/defaultVariables';
import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType, ReactNode } from 'react';
import {
  EDLEvent,
  ESize,
  IAppContext,
  ICartItemProps,
  ICartItemState,
  IDLItem,
} from 'types/scandiweb-de-test-task.d';
import { addDataLayerItem } from 'utils/dataLayer';

class CartItem extends Component<ICartItemProps, ICartItemState> {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  state: ICartItemState = {
    currentImageIndex: 0,
  };

  getEcommerceImpressionsItem = (): IDLItem => ({
    event: EDLEvent.IMPRESSIONS,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      impressions: [
        {
          id: this.props.item.id,
          name: this.props.item.name,
          price: this.props.item.price,
          brand: this.props.item.brand,
          variant: `${this.props.item.selectedOptions?.size ?? ''}`,
          category: this.props.item.category,
          list: this.props.list,
          position: this.props.position,
          dimension1: `${this.props.item.id}${
            this.props.item.selectedOptions?.size
              ? '-' + this.props.item.selectedOptions.size
              : ''
          }${
            this.props.item.selectedOptions?.color
              ? '-' + this.props.item.selectedOptions.color.toUpperCase()
              : ''
          }`,
          dimension2: `${
            this.props.item.selectedOptions?.color
              ? this.props.item.selectedOptions.color.charAt(0).toUpperCase() +
                this.props.item.selectedOptions.color.substring(1) +
                ' '
              : ''
          }${this.props.item.brand} ${this.props.item.name}${
            this.props.item.selectedOptions?.size
              ? ' ' + ESize[this.props.item.selectedOptions.size]
              : ''
          }`,
        },
      ],
    },
  });

  getEcommerceAddToCartItem = (): IDLItem => ({
    event: EDLEvent.ADD_TO_CART,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      add: {
        products: [
          {
            id: this.props.item.id,
            name: this.props.item.name,
            price: this.props.item.price,
            brand: this.props.item.brand,
            variant: `${this.props.item.selectedOptions?.size ?? ''}`,
            category: this.props.item.category,
            quantity: 1,
            dimension1: `${this.props.item.id}${
              this.props.item.selectedOptions?.size
                ? '-' + this.props.item.selectedOptions.size
                : ''
            }${
              this.props.item.selectedOptions?.color
                ? '-' + this.props.item.selectedOptions.color.toUpperCase()
                : ''
            }`,
            dimension2: `${
              this.props.item.selectedOptions?.color
                ? this.props.item.selectedOptions.color
                    .charAt(0)
                    .toUpperCase() +
                  this.props.item.selectedOptions.color.substring(1) +
                  ' '
                : ''
            }${this.props.item.brand} ${this.props.item.name}${
              this.props.item.selectedOptions?.size
                ? ' ' + ESize[this.props.item.selectedOptions.size]
                : ''
            }`,
          },
        ],
      },
    },
  });

  getEcommerceRemoveFromCartItem = (): IDLItem => ({
    event: EDLEvent.REMOVE_FROM_CART,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      add: {
        products: [
          {
            id: this.props.item.id,
            name: this.props.item.name,
            price: this.props.item.price,
            brand: this.props.item.brand,
            variant: `${this.props.item.selectedOptions?.size ?? ''}`,
            category: this.props.item.category,
            quantity: 1,
            dimension1: `${this.props.item.id}${
              this.props.item.selectedOptions?.size
                ? '-' + this.props.item.selectedOptions.size
                : ''
            }${
              this.props.item.selectedOptions?.color
                ? '-' + this.props.item.selectedOptions.color.toUpperCase()
                : ''
            }`,
            dimension2: `${
              this.props.item.selectedOptions?.color
                ? this.props.item.selectedOptions.color
                    .charAt(0)
                    .toUpperCase() +
                  this.props.item.selectedOptions.color.substring(1) +
                  ' '
                : ''
            }${this.props.item.brand} ${this.props.item.name}${
              this.props.item.selectedOptions?.size
                ? ' ' + ESize[this.props.item.selectedOptions.size]
                : ''
            }`,
          },
        ],
      },
    },
  });

  addItemClickEvent = (): void => {
    addDataLayerItem(this.getEcommerceAddToCartItem());
    this.context.addToCart(this.props.item, this.props.item.selectedOptions);
  };

  removeItemClickEvent = (): void => {
    addDataLayerItem(this.getEcommerceRemoveFromCartItem());
    this.context.removeFromCart(this.props.item);
  };

  componentDidMount(): void {
    addDataLayerItem(this.getEcommerceImpressionsItem());
  }

  render(): ReactNode {
    return (
      <div className="cart__item">
        <div className="cart__item-info">
          <div className="cart__item-brand">{this.props.item.brand}</div>
          <div className="cart__item-name">{this.props.item.name}</div>
          <div className="cart__item-price">
            {this.context.settings.currency.currencySymbol}
            {(
              this.props.item.price * this.context.settings.currency.currency
            ).toFixed(2)}
          </div>
          {this.props.item.options?.size ? (
            <div className="cart__item-option-wrapper">
              <div className="cart__item-option-title">Size:</div>
              <div className="cart__item-sizes">
                {this.props.item.options.size.map((v, i) => (
                  <div
                    className={`cart__item-size${
                      v === this.props.item.selectedOptions?.size
                        ? ' cart__item-size_active'
                        : ''
                    }`}
                    key={i}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          {this.props.item.options?.color ? (
            <div className="cart__item-option-wrapper">
              <div className="cart__item-option-title">Color:</div>
              <div className="cart__item-colors">
                {this.props.item.options.color.map((v, i) => (
                  <div
                    className={`cart__item-color${
                      v === this.props.item.selectedOptions?.color
                        ? ' cart__item-color_active'
                        : ''
                    }`}
                    key={i}
                    style={{ background: v }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="cart__item-quantity-wrapper">
          <div
            className="cart__item-quantity-button"
            onClick={this.addItemClickEvent}
          >
            ＋
          </div>
          <div className="cart__item-quantity">{this.props.item.amount}</div>
          <div
            className="cart__item-quantity-button"
            onClick={this.removeItemClickEvent}
          >
            –
          </div>
        </div>
        <div
          className="cart__item-image"
          style={{
            backgroundImage: `url(${
              this.props.item.images[this.state.currentImageIndex] ??
              NO_IMAGE_THUMBNAIL
            })`,
          }}
        >
          <div className="cart__item-image-controls">
            <div
              className="cart__item-image-controls-button"
              onClick={(): void => {
                this.setState({
                  currentImageIndex:
                    this.state.currentImageIndex < 1
                      ? this.props.item.images.length - 1
                      : this.state.currentImageIndex - 1,
                });
              }}
            >{`<`}</div>
            <div
              className="cart__item-image-controls-button"
              onClick={(): void => {
                this.setState({
                  currentImageIndex:
                    this.state.currentImageIndex <
                    this.props.item.images.length - 1
                      ? this.state.currentImageIndex + 1
                      : 0,
                });
              }}
            >{`>`}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
