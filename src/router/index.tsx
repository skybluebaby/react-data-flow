import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routeConfig, { IRoute } from './routes';

const renderRoute = (route: IRoute): React.ReactNode => {
  const { path, element, children } = route;

  return (
    <Route path={path} key={path} element={element}>
      {Array.isArray(children) ? children.map(renderRoute) : null}
    </Route>
  );
};

const RouterIndex = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{routeConfig.map(renderRoute)}</Routes>
      </Suspense>
    </Router>
  );
};

export default RouterIndex;
