import { CURRENCY } from 'configs/defaultVariables';
import { Context, createContext } from 'react';
import { IAppContext } from 'types/scandiweb-de-test-task';

export const defaultAppContext: IAppContext = {
  settings: {
    currency: CURRENCY,
  },
  cart: [],
};

export const AppContext: Context<IAppContext> =
  createContext<IAppContext>(defaultAppContext);
