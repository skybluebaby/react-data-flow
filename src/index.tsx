import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import 'todomvc-app-css/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Router />);
