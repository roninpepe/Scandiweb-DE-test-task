import { Component, ReactNode } from 'react';
import AppRouter from 'components/App/Router';
import { AppContext, appState } from 'context/AppContext';
import {
  IAppState,
  ICartItem,
  ICatalogItem,
  ICurrency,
  IElementProps,
  ISelectedOptions,
} from 'types/scandiweb-de-test-task';

class App extends Component<IElementProps, IAppState> {
  state: IAppState = appState;

  changeCurrency = (currency: ICurrency): void => {
    this.setState({ settings: { currency } });
  };

  setModalState = (modal?: string): void => {
    this.setState({ modal });
  };

  addToCart = (
    item: ICatalogItem | ICartItem,
    selectedOptions: ISelectedOptions
  ): void => {
    const {
      uid,
      id,
      category,
      name,
      price,
      brand,
      configurable,
      outOfStock,
      images,
      options,
      description,
    } = item;
    const { size, color } = selectedOptions;
    const existedItem: ICartItem | undefined = this.state.cart.find(
      (i: ICartItem): boolean =>
        i.selectedOptions?.size === selectedOptions.size &&
        i.selectedOptions?.color === selectedOptions.color &&
        i.id === id
    );
    if (existedItem) {
      existedItem.amount += 1;
    } else {
      this.state.cart.push({
        uid,
        id,
        category,
        name,
        price,
        brand,
        configurable,
        outOfStock,
        images,
        description,
        options,
        selectedOptions: {
          size,
          color,
        },
        amount: 1,
      });
    }
    this.setState({ cart: [...this.state.cart] });
  };

  removeFromCart = (item: ICartItem): void => {
    const existedItem: ICartItem | undefined = this.state.cart.find(
      (i: ICartItem): boolean =>
        i.selectedOptions?.size === item.selectedOptions?.size &&
        i.selectedOptions?.color === item.selectedOptions?.color &&
        i.id === item.id
    );
    if (existedItem) {
      if (existedItem.amount > 1) {
        existedItem.amount -= 1;
        this.setState({ cart: [...this.state.cart] });
      } else {
        this.setState({
          cart: [...this.state.cart.filter((i) => i !== existedItem)],
        });
      }
    }
  };

  componentDidUpdate(): void {
    localStorage.setItem(
      'appState',
      JSON.stringify({
        settings: this.state.settings,
        cart: this.state.cart,
      })
    );
  }

  render(): ReactNode {
    return (
      <AppContext.Provider
        value={{
          cart: this.state.cart,
          settings: this.state.settings,
          modal: this.state.modal,
          changeCurrency: this.changeCurrency,
          setModalState: this.setModalState,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
        }}
      >
        <AppRouter />
      </AppContext.Provider>
    );
  }
}

export default App;
