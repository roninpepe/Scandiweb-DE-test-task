import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType } from 'react';
import {
  ECurrency,
  ECurrencySymbol,
  IAppContext,
  UCurrency,
} from 'types/scandiweb-de-test-task.d';

class ModalCurrencies extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  removeModal = (): void => {
    if (this.context.modal) this.context.setModalState(undefined);
  };

  /* componentDidMount() {
    window.addEventListener('click', this.removeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.removeModal);
  } */

  render() {
    return (
      <div className="app__modal modal modal-currencies">
        {Object.keys(ECurrencySymbol).map((key: string, i) => {
          const currencyCode: UCurrency = key as UCurrency;
          return (
            <div
              className="modal-currencies__item"
              key={i}
              onClick={() => {
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
