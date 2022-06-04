export enum ECurrency {
  USD = 'usd',
  EUR = 'eur',
  JPY = 'jpy',
}

export enum ESize {
  XXS,
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  XXXL,
  XXXXL,
}

export interface IUserSettingsContext {
  currency: ECurrency;
}

export interface IStoreItem {
  name: string;
  type: string;
  price: number;
}

export interface IConfigurableStoreItem extends IStoreItem {
  size?: ESize;
  color?: string;
}

export interface ICartItem extends IConfigurableStoreItem {
  amount: number;
}

export interface IAppContext {
  settings: IUserSettingsContext;
  cart: ICartItem[];
  overlay?: string;
}
