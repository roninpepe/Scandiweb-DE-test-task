import { CURRENCY } from 'configs/defaultVariables';
import { Context, createContext } from 'react';
import { IAppContext, IAppState } from 'types/scandiweb-de-test-task.d';

const defaultAppState: IAppState = {
  settings: {
    currency: CURRENCY,
  },
  cart: [],
};

const ls = localStorage.getItem('appState');

export const appState: IAppState = ls ? JSON.parse(ls) : defaultAppState;

const defaultAppContext: IAppContext = {
  settings: appState.settings,
  cart: appState.cart,
  modal: appState.modal,
  changeCurrency: (): void => {},
  setModalState: (): void => {},
  addToCart: (): void => {},
  removeFromCart: (): void => {},
};

export const AppContext: Context<IAppContext> =
  createContext<IAppContext>(defaultAppContext);
