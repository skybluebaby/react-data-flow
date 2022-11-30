import React from 'react';
import ReduxApp from '@/pages/ReduxApp';
export interface IRoute {
  path: string;
  element?: React.ReactNode;
  children?: IRoute[];
}

const MobxApp = React.lazy(() => import('@/pages/MobxApp'));
const ReactApp = React.lazy(() => import('@/pages/ReactApp'));
const Home = React.lazy(() => import('@/pages/Home'));

const routeConfig: IRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mobx',
    element: <MobxApp />,
  },
  {
    path: '/react',
    element: <ReactApp />,
  },
  {
    path: '/redux',
    element: <ReduxApp />,
  },
];

export default routeConfig;
