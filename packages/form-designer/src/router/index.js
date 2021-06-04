import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const menuGlobal = [
  {
    id: 'app',
    pid: '0',
    name: 'App页',
    icon: 'user',
    path: '/',
    component: () => import('../pages/Layout.tsx'),
  },
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {menuGlobal.map(({ path, ...dynamics }, index) => (
          <Route
            key={index}
            path={path}
            exact
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
