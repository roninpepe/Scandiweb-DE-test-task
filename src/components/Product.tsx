import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType } from 'react';
import {
  EDLEvent,
  ESize,
  IAppContext,
  ICatalogItem,
  IDLItem,
  IElementProps,
  IProductState,
  USize,
} from 'types/scandiweb-de-test-task.d';

import mock from 'mocks/categoryData.json';
import { NO_IMAGE_THUMBNAIL } from 'configs/defaultVariables';

const data = mock.items as ICatalogItem[];

class Product extends Component<IElementProps, IProductState> {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  uid: string = window.location.pathname.substring(6) ?? '';

  item: ICatalogItem =
    data.find((item) => `${item.uid}` === this.uid) ?? data[0];

  state: IProductState = {
    currentImage: this.item.images[0] ?? NO_IMAGE_THUMBNAIL,
  };

  setSize = (size: USize): void => {
    this.setState(() => ({ size }));
  };

  setColor = (color: string): void => {
    this.setState(() => ({ color }));
  };

  changeImage = (currentImage: string): void => {
    this.setState(() => ({ currentImage }));
  };

  position = 1;

  list = 'Product Page';

  getEcommerceAddToCartItem = (): IDLItem => ({
    event: EDLEvent.ADD_TO_CART,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      add: {
        products: [
          {
            id: this.item.id,
            name: this.item.name,
            price: this.item.price,
            brand: this.item.brand,
            variant: `${this.state.size ?? ''}`,
            category: this.item.category,
            quantity: 1,
            dimension1: `${this.item.id}${
              this.state.size ? '-' + this.state.size : ''
            }${this.state.color ? '-' + this.state.color.toUpperCase() : ''}`,
            dimension2: `${
              this.state.color
                ? this.state.color.charAt(0).toUpperCase() +
                  this.state.color.substring(1) +
                  ' '
                : ''
            }${this.item.brand} ${this.item.name}${
              this.state.size ? ' ' + ESize[this.state.size] : ''
            }`,
          },
        ],
      },
    },
  });

  getEcommerceImpressionsItem = (): IDLItem => ({
    event: EDLEvent.IMPRESSIONS,
    ecommerce: {
      currencyCode: this.context.settings.currency.currencyCode,
      impressions: [
        {
          id: this.item.id,
          name: this.item.name,
          price: this.item.price,
          brand: this.item.brand,
          variant: '',
          category: this.item.category,
          list: this.list,
          position: this.position,
          dimension1: '',
          dimension2: '',
        },
      ],
    },
  });

  getEcommerceProductDetailItem = (): IDLItem => ({
    event: EDLEvent.DETAIL,
    ecommerce: {
      detail: {
        products: [
          {
            id: this.item.id,
            name: this.item.name,
            price: this.item.price,
            brand: this.item.brand,
            variant: '',
            category: this.item.category,
            dimension1: '',
            dimension2: '',
          },
        ],
      },
    },
  });

  clickEvent = () => {
    console.log(this.getEcommerceAddToCartItem()); // TODO: dataLayer support
    this.context.addToCart(this.item, this.state);
  };

  componentDidMount() {
    console.log(this.getEcommerceImpressionsItem()); // TODO: dataLayer support
    console.log(this.getEcommerceProductDetailItem()); // TODO: dataLayer support
  }

  render() {
    return (
      <div className="page__product product">
        <div className="product__gallery-wrapper">
          <div className="product__thumbnails">
            {this.item.images.map((item, i) => (
              <div
                className="product__thumbnail"
                key={i}
                style={{ backgroundImage: `url(${item})` }}
                onClick={() => {
                  this.changeImage(item);
                }}
              ></div>
            ))}
          </div>
          <img
            src={this.state.currentImage}
            alt={this.item.name}
            className="product__image"
          />
        </div>
        <div className="product__info">
          <div className="product__brand">{this.item.brand}</div>
          <div className="product__name">{this.item.name}</div>
          {this.item.options?.size ? (
            <div className="product__sizes">
              <div className="product__option-title">Size:</div>
              <div className="product__option-wrapper product__sizes-wrapper">
                {this.item.options.size.map((item, i) => (
                  <div
                    className={`product__size${
                      this.state.size === item ? ' product__size_active' : ''
                    }`}
                    key={i}
                    onClick={() => {
                      this.setSize(item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          {this.item.options?.color ? (
            <div className="product__colors">
              <div className="product__option-title">Color:</div>
              <div className="product__option-wrapper product__colors-wrapper">
                {this.item.options.color.map((item, i) => (
                  <div
                    className={`product__color${
                      this.state.color === item ? ' product__color_active' : ''
                    }`}
                    key={i}
                    style={{ backgroundColor: item }}
                    onClick={() => {
                      this.setColor(item);
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="product__price-wrapper">
            <div className="product__option-title">Price:</div>
            <div className="product__price">
              {this.context.settings.currency.currencySymbol}
              {(
                this.item.price * this.context.settings.currency.currency
              ).toFixed(2)}
            </div>
          </div>
          <div className="product__buy" onClick={this.clickEvent}>
            Add to cart
          </div>
          <div className="product__description">{this.item.description}</div>
        </div>
      </div>
    );
  }
}

export default Product;
