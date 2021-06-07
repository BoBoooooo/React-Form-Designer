import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import styles from '../styles/app.module.scss';
import { Layout } from 'antd';
import Material from './components/Material';
import Panel from './components/Panel';
import WidgetConfig from './components/WidgetConfig';
import { StarOutlined } from '@ant-design/icons';
import { handleBtns } from '../config';
import { widgetClone } from '../utils/form';
import { formJsonType } from '../types/form.d';
import { FormContext as GlobalContext } from '../context/global';

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  // 设计器初始值

  const handleAction = () => {
    console.log('暂未开发');
  };

  // 初始化formJSON数据
  const [widgetForm, setWidgetForm] = useState<formJsonType>({
    list: [],
    config: {
      labelWidth: 140,
      labelPosition: 'horizontal',
      size: 'middle',
      labelAlign: 'right',
    },
  });

  const [selectedWidget, setSelectedWidget] = useState<Record<string, any>>({});

  // 添加物料到画板区域
  const addWidget = (item: any) => {
    const widget = widgetClone(item);
    console.log('add', widget);
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.push(widget);
      return temp;
    });
    setSelectedWidget(widget);
  };

  // 表单JSON改变回调
  useEffect(() => {
    console.log('当前表单json', widgetForm);
  }, [widgetForm]);

  // 表单JSON改变回调
  useEffect(() => {
    if (selectedWidget && Object.keys(selectedWidget).length > 0) {
      setWidgetForm(value => {
        let temp = { ...value };
        const index = temp.list.findIndex(_ => _.key === selectedWidget.key);
        temp.list[index] = selectedWidget;
        return temp;
      });
    }
  }, [selectedWidget]);

  return (
    // 全局注入表单json 设置表单json 添加物料方法
    <GlobalContext.Provider
      value={{
        widgetForm,
        setWidgetForm,
        addWidget,
      }}
    >
      <Layout className={styles['fd-container']}>
        {/* 顶部导航区域 */}
        <Header className={styles['fd-container-header']}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}>BForm</span>
          {/* 操作按钮 */}
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
        {/* 主体区域 */}
        <Layout>
          {/* 物料库 */}
          <Sider width="250px" className={styles['fd-container-sider']} theme="light">
            <Material></Material>
          </Sider>
          {/* 设计面板 */}
          <Content className={styles['fd-container-content']}>
            <Panel addWidget={addWidget} widgetForm={widgetForm} selectedWidget={selectedWidget} setSelectedWidget={setSelectedWidget}></Panel>
          </Content>
          {/* 配置区域 */}
          <Sider
            width="250px"
            className={styles['fd-container-sider']}
            style={{
              padding: 0,
            }}
            theme="light"
          >
            <WidgetConfig selectedWidget={selectedWidget} setSelectedWidget={setSelectedWidget}></WidgetConfig>
          </Sider>
        </Layout>
      </Layout>
    </GlobalContext.Provider>
  );
};

export default App;
