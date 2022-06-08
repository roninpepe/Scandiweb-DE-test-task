import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType, ReactNode } from 'react';
import {
  ECurrency,
  ECurrencySymbol,
  IAppContext,
  UCurrency,
} from 'types/scandiweb-de-test-task.d';

class ModalCurrencies extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  render(): ReactNode {
    return (
      <div className="app__modal modal modal-currencies">
        {Object.keys(ECurrencySymbol).map((key: string, i): ReactNode => {
          const currencyCode: UCurrency = key as UCurrency;
          return (
            <div
              className="modal-currencies__item"
              key={i}
              onClick={(): void => {
                this.context.changeCurrency({
                  currencyCode,
                  currencySymbol: ECurrencySymbol[currencyCode],
                  currency: ECurrency[currencyCode],
                });
                this.context.setModalState(undefined);
              }}
            >
              {ECurrencySymbol[currencyCode]} {key}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ModalCurrencies;
