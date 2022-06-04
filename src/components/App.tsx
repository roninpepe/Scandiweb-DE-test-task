import React, { Component } from 'react';
import AppRouter from 'components/App/Router';
import { AppContext, defaultAppContext } from 'context/AppContext';

class App extends Component {
  render() {
    return (
      <AppContext.Provider value={defaultAppContext}>
        <AppRouter />
      </AppContext.Provider>
    );
  }
}

export default App;
