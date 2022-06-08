import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType } from 'react';
import { IAppContext } from 'types/scandiweb-de-test-task';

import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';
import ModalCurrencies from 'components/Modal/Currencies';

class HeaderCurrency extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  clickEvent = (): void => {
    if (this.context.modal === 'currency') {
      this.context.setModalState(undefined);
    } else {
      this.context.setModalState('currency');
    }
  };

  render() {
    return (
      <div className="header__currency" onClick={this.clickEvent}>
        {this.context.settings.currency.currencySymbol}
        <span className="header__currency-opener">
          {this.context.modal === 'currency' ? <ArrowUp /> : <ArrowDown />}
        </span>
        {this.context.modal === 'currency' ? <ModalCurrencies /> : ''}
      </div>
    );
  }
}

export default HeaderCurrency;
