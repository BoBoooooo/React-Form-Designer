import React from 'react';
import logo from '../assets/logo.svg';
import styles from '../styles/app.module.scss';
// import { Link } from "dva/router";
// import Antd from "./Antd";
import { connect } from 'dva';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  return (
    <>
      <Layout className={styles['fd-container']}>
        <Header className={styles['fd-container-header']}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}> Form Generate </span>

        </Header>
        <Layout>
          <Sider className={styles['fd-container-sider']} theme="light">
            物料库区域
          </Sider>
          <Content className={styles['fd-container-content']}>
            
          </Content>
          <Sider className={styles['fd-container-sider']} theme="light">
            配置面板
          </Sider>
        </Layout>
      </Layout>
    </>
  );
};

export default connect(({ app }) => ({
  app,
}))(App);
