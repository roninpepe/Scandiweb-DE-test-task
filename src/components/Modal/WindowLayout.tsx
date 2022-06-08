import { AppContext } from 'context/AppContext';
import { Component, Context, ContextType, ReactNode } from 'react';
import { IAppContext } from 'types/scandiweb-de-test-task';
import ModalCart from './Cart';

class ModalWindowLayout extends Component {
  static contextType: Context<IAppContext> = AppContext;

  context: ContextType<typeof AppContext> = this.context;

  removeModalWindow = (): void => {
    this.context.setModalState(undefined);
  };

  render(): ReactNode {
    return this.context.modal === 'cart' ? (
      <div className="app__modal-window-layout modal-window-layout">
        <div
          className="modal-window-layout__modal-remover"
          onClick={this.removeModalWindow}
        />
        <ModalCart />
      </div>
    ) : (
      <></>
    );
  }
}

export default ModalWindowLayout;
