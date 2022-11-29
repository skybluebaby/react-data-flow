import React from 'react';
import TodoStoreProvide from './TodoContext';
import Header from './components/Header';
import MainSection from './components/MainSection';

function MobxApp() {
  return (
    <TodoStoreProvide>
      <Header />
      <MainSection />
    </TodoStoreProvide>
  );
}

export default MobxApp;
