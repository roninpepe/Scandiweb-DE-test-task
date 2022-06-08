import {
  ECurrency,
  ECurrencySymbol,
  ICurrencies,
  ICurrency,
} from 'types/scandiweb-de-test-task.d';

export const CURRENCIES: ICurrencies = {
  USD: {
    currencyCode: 'USD',
    currencySymbol: ECurrencySymbol.USD,
    currency: ECurrency.USD,
  },
  EUR: {
    currencyCode: 'EUR',
    currencySymbol: ECurrencySymbol.EUR,
    currency: ECurrency.EUR,
  },
  JPY: {
    currencyCode: 'JPY',
    currencySymbol: ECurrencySymbol.JPY,
    currency: ECurrency.JPY,
  },
};

export const CURRENCY: ICurrency = CURRENCIES.USD;

export const NO_IMAGE_THUMBNAIL = 'https://files.catbox.moe/mivwwa.jpg';
