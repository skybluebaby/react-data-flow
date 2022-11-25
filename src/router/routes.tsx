import React from 'react';

export interface IRoute {
  path: string;
  element?: React.ReactNode;
  children?: IRoute[];
}

const MobxApp = React.lazy(() => import('../pages/MobxApp'));
const ReactApp = React.lazy(() => import('../pages/ReactApp'));

const routeConfig: IRoute[] = [
  {
    path: '/mobx',
    element: <MobxApp />,
  },
  {
    path: '/react',
    element: <ReactApp />,
  },
];

export default routeConfig;
