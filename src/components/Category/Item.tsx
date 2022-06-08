import { Component, Context, ContextType, ReactNode } from 'react';
import {
  EDLEvent,
  IAppContext,
  ICatalogItemProps,
  IDLItem,
} from 'types/scandiweb-de-test-task.d';
import { ReactComponent as Cart } from 'assets/icons/cart.svg';
import { AppContext } from 'context/AppContext';
import { NO_IMAGE_THUMBNAIL } from 'configs/defaultVariables';
import { addDataLayerItem } from 'utils/dataLayer';

class CategoryItem extends Component<ICatalogItemProps> {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  list = 'Category Page';

  getEcommerceProductClickItem = (): IDLItem => ({
    event: EDLEvent.PRODUCT_CLICK,
    ecommerce: {
      click: {
        actionField: {
          list: this.list,
        },
        products: [
          {
            id: this.props.item.id,
            name: this.props.item.name,
            price: this.props.item.price,
            brand: this.props.item.brand,
            variant: '',
            category: this.props.item.category,
            position: this.props.position,
            dimension1: '',
            dimension2: '',
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
          id: this.props.item.id,
          name: this.props.item.name,
          price: this.props.item.price,
          brand: this.props.item.brand,
          variant: '',
          category: this.props.item.category,
          list: this.list,
          position: this.props.position,
          dimension1: '',
          dimension2: '',
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
            variant: '',
            category: this.props.item.category,
            quantity: 1,
            dimension1: '',
            dimension2: '',
          },
        ],
      },
    },
  });

  clickEvent = (): void => {
    addDataLayerItem(this.getEcommerceProductClickItem());
    this.context.addToCart(this.props.item, undefined);
  };

  cartClickEvent = (): void => {
    addDataLayerItem(this.getEcommerceAddToCartItem());
  };

  componentDidMount(): void {
    addDataLayerItem(this.getEcommerceImpressionsItem());
  }

  render(): ReactNode {
    return (
      <a
        className="category__category-item category-item"
        href={`../item/${this.props.item.uid}`}
        onClick={this.clickEvent}
      >
        <div
          className="category-item__thumbnail"
          style={{
            backgroundImage: `url(${
              this.props.item.images[0] ?? NO_IMAGE_THUMBNAIL
            })`,
          }}
        ></div>
        <div
          className="category-item__cart-icon _prominent"
          onClick={(event): void => {
            if (!this.props.item.configurable) {
              event.preventDefault();
              this.cartClickEvent();
            }
          }}
        >
          <Cart />
        </div>
        <div className="category-item__name">
          {this.props.item.brand} {this.props.item.name}
        </div>
        <div className="category-item__price">
          {this.context.settings.currency.currencySymbol}
          {(
            this.props.item.price * this.context.settings.currency.currency
          ).toFixed(2)}
        </div>
      </a>
    );
  }
}

export default CategoryItem;
