import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import styles from '../styles/app.module.scss';
import { Divider, Input, Layout, message, Modal, Form, Button } from 'antd';
import Material from './components/Material';
import Panel from './components/Panel';
import WidgetConfig from './components/WidgetConfig';
import * as Icon from '@ant-design/icons';
import handleBtns from '../config/handleButtons';
import { widgetClone } from '../utils/form';
import { formJsonType } from '../types/form.d';
import { FormContext as GlobalContext } from '../context/global';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  // 操作按钮
  const handleAction = btn => {
    switch (btn.script) {
      case 'handleGenerateJson':
        Modal.success({
          title: '生成JSON',
          maskClosable: true,
          width: '50%',
          content: JSON.stringify(widgetForm),
        });
        break;
      case 'handleImportJson':
        setIsModalVisible(true);
        break;
      case 'handleClear':
        handleClear();
        message.success('清空成功');
        break;
      case 'changeModeToEdit':
        setStatus('edit');
        message.success('已切换至布局模式');
        break;
      case 'changeModeToPreview':
        setStatus('preview');
        message.success('已切换至预览模式');
        break;
      default:
        message.info('开发中!!!');
        break;
    }
  };
  // 清空按钮
  const handleClear = () => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list = [];
      return temp;
    });
    setSelectedWidget({});
  };
  // 导入JSON按钮
  const handleImportJson = values => {
    setWidgetForm(JSON.parse(values.formJson));
    message.success('导入成功');
    setIsModalVisible(false);
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

  const [status, setStatus] = useState<'edit' | 'preview'>('edit');

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 添加物料到画板区域
  const addWidget = (item: any, dragIndex: number | undefined) => {
    let widget;

    console.log('add', widget, dragIndex);

    // 如果有currentIndex代表是移动操作,不进行clone,直接移动位置即可
    item.currentIndex ? (widget = { ...item }) : (widget = widgetClone(item));
    // 删除移动前组件所在索引
    delete widget.currentIndex;

    setWidgetForm(value => {
      const temp = { ...value };
      // 如果中间区域是空或者是直接点击物料,默认加到list尾部
      if (dragIndex === -1 || dragIndex === undefined) {
        temp.list.push(widget);
      } else {
        temp.list.splice(dragIndex + 1, 0, widget);
      }
      setSelectedWidget(widget);
      return temp;
    });
  };

  const deleteWidget = (index: number) => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.splice(index, 1);
      setSelectedWidget({ ...(temp.list[index] || temp.list[index - 1]) });
      return temp;
    });
  };

  const cloneWidget = (oldWidget, index) => {
    const newWidget = widgetClone(oldWidget);
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.splice(index + 1, 0, newWidget);
      setSelectedWidget({ ...newWidget });
      return temp;
    });
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
        status,
        widgetForm,
        setWidgetForm,
        addWidget,
        deleteWidget,
        cloneWidget,
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
                <React.Fragment key={btn.label}>
                  <div className={[styles.button, status === btn.mode ? styles.active : null].join(' ')} onClick={() => handleAction(btn)}>
                    {React.createElement(Icon[btn.icon], {
                      className: styles.icon,
                    })}
                    <span>{btn.label}</span>
                  </div>
                  {btn.divider && <Divider type="vertical" className={styles.divider} />}
                </React.Fragment>
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

      {/* 导入JSON对话框 */}
      <Modal title="导入JSON" footer={null} visible={isModalVisible} maskClosable closable={false}>
        <Form onFinish={handleImportJson}>
          <Form.Item
            name="formJson"
            rules={[
              {
                required: true,
                validator: (rule, value, callback) => {
                  console.log(value);
                  try {
                    if (typeof JSON.parse(value) !== 'object') {
                      throw new Error('请输入正确的json');
                    } else {
                      callback();
                    }
                  } catch (err) {
                    callback(err);
                  }
                },
              },
            ]}
          >
            <AceEditor
              setOptions={{ useWorker: false }}
              ref="editor"
              mode="json"
              theme="github"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
              style={{ width: '100%', height: '500px', overflow: 'auto', fontSize: '16px' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              导入JSON
            </Button>
            <Button type="default" onClick={() => setIsModalVisible(false)}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </GlobalContext.Provider>
  );
};

export default App;
