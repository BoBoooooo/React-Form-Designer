import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import styles from '../styles/app.module.scss';
// import { Link } from "dva/router";
// import Antd from "./Antd";
import { connect } from 'dva';
import { Layout } from 'antd';
import Material from './components/Material';
import Panel from './components/Panel';
import Config from './components/Config';
import { StarOutlined } from '@ant-design/icons';
import { handleBtns } from '../config';
import { random } from '../utils/generator';
import { formJsonType } from '../types/form.d';

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  // 设计器初始值

  const handleAction = () => {
    console.log('暂未开发');
  };

  const [widgetForm, setWidgetForm] = useState<formJsonType>({
    list: [],
    config: {
      labelWidth: 140,
      labelPosition: 'right',
      columnList: [],
    },
  });

  const addWidget = (item: any) => {
    console.log('add', item);
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.push(handleClone(item));
      return temp;
    });
  };

  const handleClone = (origin: any) => {
    const {
      type = 'type',
      options: { remoteOptions },
    } = origin;
    const key = `${type}_${random()}`;
    const cloneOrigin = JSON.parse(
      JSON.stringify({
        ...origin,
        key,
        model: key,
        rules: [],
      })
    );
    if (remoteOptions) {
      cloneOrigin.options.remoteFunc = `func_${key}`;
    }
    if (cloneOrigin.options.placeholder !== undefined) {
      cloneOrigin.options.placeholder = `请填写${cloneOrigin.name}`;
    }
    return cloneOrigin;
  };
  return (
    <>
      <Layout className={styles['fd-container']}>
        <Header className={styles['fd-container-header']}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}>BForm</span>
          <div className={styles['btn-bar']}>
            {handleBtns.map(btn => {
              return (
                <div key={btn.label} className={styles.button} onClick={handleAction}>
                  <StarOutlined className={styles.icon} />
                  <span>{btn.label}</span>
                </div>
              );
            })}
          </div>
        </Header>
        <Layout>
          <Sider width="250px" className={styles['fd-container-sider']} theme="light">
            <Material addWidget={addWidget}></Material>
          </Sider>
          <Content className={styles['fd-container-content']}>
            <Panel widgetForm={widgetForm}></Panel>
          </Content>
          <Sider
            width="250px"
            className={styles['fd-container-sider']}
            style={{
              padding: 0,
            }}
            theme="light"
          >
            <Config></Config>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
};

export default connect(({ app }) => ({
  app,
}))(App);
