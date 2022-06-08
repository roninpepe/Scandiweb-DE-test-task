import { ReactNode } from 'react';

// = enums

export enum ECurrencySymbol {
  USD = '$',
  EUR = '€',
  JPY = '¥',
}

export enum ECurrency {
  USD = 1,
  EUR = 0.93,
  JPY = 130.81,
}

export enum ESize {
  XXS = 'Double Extra Small',
  XS = 'Extra Small',
  S = 'Small',
  M = 'Medium',
  L = 'Large',
  XL = 'Extra Large',
  XXL = 'Double Extra Large',
  XXXL = 'Triple Extra Large',
}

export enum EDLEvent {
  IMPRESSIONS = 'impressions',
  PRODUCT_CLICK = 'productClick',
  DETAIL = 'detail',
  ADD_TO_CART = 'addToCart',
  REMOVE_FROM_CART = 'removeFromCart',
  CHECKOUT = 'checkout',
}

// == enum keys

export type UCurrency = keyof typeof ECurrency;

export type USize = keyof typeof ESize;

// == extended enum interfaces

export interface ICurrency {
  currencyCode: UCurrency;
  currencySymbol: ECurrencySymbol;
  currency: ECurrency;
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface ISize {
  sizeAcronym: USize;
  sizeName: ESize;
}

// = app interfaces

export interface IUserSettings {
  currency: ICurrency;
}

export interface IProduct {
  uid: number;
  id: string;
  category: string;
  name: string;
  price: number;
  brand: string;
  configurable: boolean;
  outOfStock: boolean;
  images: string[];
  description?: string;
}

export interface IAvailableOptions {
  size?: USize[];
  color?: string[];
}

export interface ISelectedOptions {
  size?: USize;
  color?: string;
}

export interface ICatalogItem extends IProduct {
  options?: IAvailableOptions;
}

export interface ICartItem extends ICatalogItem {
  selectedOptions?: ISelectedOptions;
  amount: number;
}

// = props

export interface IElementProps {
  className?: string;
  key?: string;
  children?: ReactNode | ReactNode[];
  location?: {
    href?: string;
    pathname?: string;
  };
}

export interface ICatalogItemProps extends IElementProps {
  item: ICatalogItem;
  position: number;
}

export interface ICartItemProps extends IElementProps {
  item: ICartItem;
  position: number;
  list: string;
}

// = states

export interface IAppState {
  settings: IUserSettings;
  cart: ICartItem[];
  modal?: string;
}

export interface IProductState extends ISelectedOptions {
  currentImage: string;
}

export interface ICartItemState extends ISelectedOptions {
  currentImageIndex: number;
}

// = context

export interface IAppContext extends IAppState {
  changeCurrency(currency: ICurrency): void;
  setModalState(modal: string | undefined): void;
  addToCart(item: ICatalogItem | ICartItem, options?: ISelectedOptions): void;
  removeFromCart(item: ICartItem): void;
}

// # dataLayer

export interface IDLProduct {
  id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  dimension1: string;
  dimension2: string;
  variant?: string;
  quantity?: number;
  list?: string;
  position?: number;
}

export interface IDLClick {
  actionField: {
    list: string;
  };
  products: IDLProduct[];
}

export interface IDLDetail {
  products: IDLProduct[];
}

export interface IDLAdd {
  products: IDLProduct[];
}

export interface IDLCheckout {
  actionField: {
    step: number;
    option: string;
  };
  products: IDLProduct[];
}

export interface IDLEcommerce {
  currencyCode?: UCurrency;
  impressions?: IDLProduct[];
  click?: IDLClick;
  detail?: IDLDetail;
  add?: IDLAdd;
  checkout?: IDLCheckout;
}

export interface IDLItem {
  event?: EDLEvent;
  ecommerce: IDLEcommerce | null;
}
