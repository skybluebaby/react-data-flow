import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import Header from './components/Header';
import MainSection from './components/MainSection';

function ReduxApp() {
  // 这里暂时先写这里，实际工程项目写在入口处
  return (
    <Provider store={store}>
      <div>
        <Header />
        <MainSection />
      </div>
    </Provider>
  );
}

export default ReduxApp;
