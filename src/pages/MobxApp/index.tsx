import React from 'react';
import TodoStoreProvide from './TodoStore';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';

function MobxApp() {
  return (
    <TodoStoreProvide>
      <Header></Header>
      <Section></Section>
      <Footer></Footer>
    </TodoStoreProvide>
  );
}

export default MobxApp;
