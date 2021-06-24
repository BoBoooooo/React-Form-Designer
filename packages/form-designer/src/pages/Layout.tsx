import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import styles from '../styles/app.module.scss';
import { Divider, Layout, message, Modal, Form, Button } from 'antd';
import Material from './components/Material';
import WidgetForm from './components/WidgetForm';
import WidgetConfig from './components/WidgetConfig';
import * as Icon from '@ant-design/icons';
import handleBtns from '../config/handleButtons';
import { widgetClone } from '../utils/form';
import { formJsonType } from '../types/form.d';
import { FormContext as GlobalContext } from '../context/global';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
// import { FormGenerater } from '@music/xform-generater';
import FormGenerater from '../components/form-generater/BForm';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Header, Sider, Content } = Layout;

export const AppContext = React.createContext({ content: '' });

const App = () => {
  const [form] = Form.useForm();

  // 操作按钮
  const handleAction = btn => {
    switch (btn.script) {
      case 'handleGenerateJson':
        handleGenerateJson();
        break;
      case 'handleImportJson':
        setStatus('import');
        form.resetFields();
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
  // 生成JSON按钮
  const handleGenerateJson = () => {
    form.setFieldsValue({
      formJson: JSON.stringify(widgetForm, null, '\t'),
    });
    setIsModalVisible(true);
  };
  // 导入JSON按钮
  const handleImportJson = values => {
    setWidgetForm(JSON.parse(values.formJson));
    setIsModalVisible(false);
    message.success('导入成功');
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

  const [status, setStatus] = useState<'edit' | 'preview' | 'import'>('edit');

  const [isModalVisible, setIsModalVisible] = useState(false);

  // 添加物料到画板区域
  const addWidget = (item: any, dragIndex: number | undefined) => {
    let widget;

    console.log('add', widget, dragIndex);

    // 如果有key代表是移动操作,不进行clone,直接移动位置即可
    item.key ? (widget = { ...item }) : (widget = widgetClone(item));

    // 如果是栅格区域拖拽回外侧容器,清空临时标记位
    delete widget._widget;
    delete widget._rowIndex;
    delete widget._colIndex;
    delete widget._index;
    // 删除icon
    delete widget.icon;

    setWidgetForm(value => {
      const temp = { ...value };
      // 如果中间区域是空或者是直接点击物料,默认加到list尾部
      if (dragIndex === -1 || dragIndex === undefined) {
        temp.list.push(widget);
      } else {
        temp.list.splice(dragIndex + 1, 0, widget);
      }
      // hack方法,防止异步问题导致setSelectedWidget不生效
      setTimeout(() => {
        setSelectedWidget(widget);
      }, 0);
      return temp;
    });
  };

  // 删除物料
  const deleteWidget = (index: number) => {
    console.log('删除,原先所在位置', index);
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.splice(index, 1);
      // hack方法,防止异步问题导致setSelectedWidget不生效
      setTimeout(() => {
        setSelectedWidget({ ...(temp.list[index] || temp.list[index - 1]) });
      }, 0);
      return temp;
    });
  };

  // 复制物料
  const cloneWidget = (oldWidget, index) => {
    const newWidget = widgetClone(oldWidget);
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.splice(index + 1, 0, newWidget);
      return temp;
    });
    message.success('复制成功');
  };

  // 复制栅格内物料
  const cloneGridWidget = (oldWidget, rowIndex, colIndex, index) => {
    const newWidget = widgetClone(oldWidget);
    setWidgetForm(value => {
      const temp = { ...value };
      // 找到该栅格
      const col = temp.list[rowIndex]?.columns[colIndex];
      newWidget['_widget'] = 'Row';
      newWidget['_rowIndex'] = rowIndex;
      newWidget['_colIndex'] = colIndex;
      newWidget['_index'] = index + 1;
      col.list.splice(index + 1, 0, newWidget);
      return temp;
    });
    message.success('复制成功');
  };

  // 删除Row栅格中的组件
  const deleteGridWidget = (rowIndex, colIndex, index) => {
    setWidgetForm(value => {
      const temp = { ...value };
      // 找到该栅格
      const col = temp.list[rowIndex]?.columns[colIndex];
      col.list.splice(index, 1);
      return temp;
    });
  };

  // 表单JSON改变回调
  // useEffect(() => {
  //   console.log('当前表单json', widgetForm);
  // }, [widgetForm]);

  // 右侧字段配置回填到表单JSON中
  useEffect(() => {
    if (selectedWidget && Object.keys(selectedWidget).length > 0) {
      setWidgetForm(value => {
        let temp = { ...value };
        const { _widget, _rowIndex, _colIndex, _index } = selectedWidget;
        console.log('回填JSON', selectedWidget);
        if (_widget === 'Row') {
          const col = temp.list[_rowIndex]?.columns[_colIndex];
          if (col.list) {
            col.list[_index] = selectedWidget;
          }
        } else {
          const index = temp.list.findIndex(_ => _.key === selectedWidget.key);
          temp.list[index] = selectedWidget;
        }
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
        deleteGridWidget,
        cloneWidget,
        cloneGridWidget,
      }}
    >
      <Layout className={styles['fd-container']}>
        {/* 顶部导航区域 */}
        <Header className={styles['fd-container-header']}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}>BForm-Designer</span>
          {/* 操作按钮 */}
          <div className={styles['btn-bar']}>
            {handleBtns.map(btn => {
              return (
                <React.Fragment key={btn.label}>
                  <div className={[styles.button, btn.mode?.includes(status) ? styles.active : null].join(' ')} onClick={() => handleAction(btn)}>
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
            {/* <FormGenerater data={widgetForm}></FormGenerater> */}
            {status.includes('preview') ? (
              <FormGenerater data={widgetForm}></FormGenerater>
            ) : (
              <WidgetForm addWidget={addWidget} widgetForm={widgetForm} selectedWidget={selectedWidget} setSelectedWidget={setSelectedWidget}></WidgetForm>
            )}
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

      {/* 导入/导出JSON对话框 */}
      <Modal
        title={status === 'import' ? '导入JSON' : '生成JSON'}
        visible={isModalVisible}
        okText="导入JSON"
        cancelText="取消"
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          setStatus('edit');
        }}
        footer={
          status === 'edit'
            ? [
                <CopyToClipboard key="copy" text={JSON.stringify(widgetForm)} onCopy={() => message.success('已拷贝至剪切板')}>
                  <Button type="primary">复制JSON</Button>
                </CopyToClipboard>,
              ]
            : undefined
        }
      >
        <Form form={form} onFinish={handleImportJson}>
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
        </Form>
      </Modal>
    </GlobalContext.Provider>
  );
};

export default App;
