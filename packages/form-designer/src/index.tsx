import './styles/index.scss';
import dva from 'dva';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';

let app;
function render() {
  app = dva({
    history: createBrowserHistory({
      // 此处需要定义router baseName
      basename: '/',
    }),
  });

  // app.use({});

  // app.model(require("./models/App.ts").default);

  app.router(require('./router').default);

  app.start('#root');

  // https://github.com/dvajs/dva/issues/2335
  window.g_app = app;
}
render();
