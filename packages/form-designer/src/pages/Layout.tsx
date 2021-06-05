import React from 'react';
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

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  // 设计器初始值
  // const widgetForm = {
  //   list: [],
  //   config: {
  //     labelWidth: 140,
  //     labelPosition: 'right',
  //     columnList: [],
  //   },
  // };

  const handleAction = () => {
    console.log('暂未开发');
  };

  return (
    <>
      <Layout className={styles['fd-container']}>
        <Header className={styles['fd-container-header']}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}> Form Generate </span>
          <div className={styles['btn-bar']}>
            {handleBtns.map(btn => {
              return (
                <div className={styles.button} onClick={handleAction}>
                  <StarOutlined className={styles.icon} />
                  <span>{btn.label}</span>
                </div>
              );
            })}
          </div>
        </Header>
        <Layout>
          <Sider width="250px" className={styles['fd-container-sider']} theme="light">
            <Material></Material>
          </Sider>
          <Content className={styles['fd-container-content']}>
            <Panel></Panel>
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
