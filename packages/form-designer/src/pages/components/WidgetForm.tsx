/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React, { useContext } from 'react';
import form_empty from '../../assets/form_empty.svg';
import styles from '../../styles/panel.module.scss';
import { Form, Button, Modal, ConfigProvider } from 'antd';
import WidgetFormItem from './WidgetFormItem';
import { formJsonType } from '../../types/form';
import { FormContext } from '../../context/global';
import WidgetLayout from './WidgetLayout';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh');

const Empty = () => {
  return (
    <div className={styles['form-empty']}>
      <img
        src={form_empty}
        style={{
          width: '16em',
          height: '16em',
        }}
        alt="logo"
      />
      <span>拖拽 或 点击 添加组件至此处!</span>
    </div>
  );
};

const Panel = (props: { widgetForm: formJsonType; selectedWidget: Record<string, any>; setSelectedWidget: Function }) => {
  const [form] = Form.useForm();
  const { widgetForm } = props;
  // 通过 Form 的 Submit监听 得到字段值
  const onFinish = values => {
    Modal.info({
      title: '当前表单值为',
      content: JSON.stringify(values),
    });
  };

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <Form labelCol={{ style: { width: widgetForm.config.labelWidth } }} layout={widgetForm.config.labelPosition} size={widgetForm.config.size} form={form} initialValues={{}} onFinish={onFinish}>
          {widgetForm.list.map((component, index) => {
            // 此处判断是栅格布局嵌套还是直接拖拽组件
            if (component.type === 'Row') {
              return <WidgetLayout key={component.key} index={index} component={component} {...props}></WidgetLayout>;
            } else {
              return <WidgetFormItem rowIndex={null} colIndex={null} key={component.key} index={index} component={component} {...props}></WidgetFormItem>;
            }
          })}
          {/* Submit按钮 */}
          <Form.Item
            wrapperCol={{
              offset: 22,
            }}
            style={{
              textAlign: 'right',
              marginTop: '10px',
            }}
          >
            <Button type="primary" htmlType="submit">
              获取表单值
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default function WidgetForm(props) {
  const { addWidget } = useContext(FormContext);

  const defaultBorderStyle = '1px dashed rgba(170, 170, 170, 0.7)';
  const hoverBorderStyle = '3px solid #389e0d';

  const drop = ev => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('Text'));
    let dragIndex;

    if (ev?.target?.className.includes('widget-view')) {
      // 查找当前拖拽到的索引位置
      dragIndex = [].indexOf.call(ev.target.parentElement.children, ev.target as never);
      console.log('拖拽物料至表单', data, dragIndex);
      ev.target.style['border-bottom'] = defaultBorderStyle;
    }

    addWidget(data, dragIndex);
  };

  const allowDrop = ev => {
    if (ev?.target?.className.includes('widget-view')) {
      ev.target.style['border-bottom'] = hoverBorderStyle;
    }
    ev.preventDefault();
  };

  const onDragLeave = ev => {
    if (ev.target.className.includes('widget-view')) {
      ev.target.style['border-bottom'] = defaultBorderStyle;
    }
  };

  return (
    <div className={styles['widget-container']} onDrop={drop} onDragOver={allowDrop} onDragLeave={onDragLeave}>
      {/* 表单没内容时显示暂无数据 */}
      {props.widgetForm.list?.length === 0 ? <Empty></Empty> : <Panel {...props}></Panel>}
    </div>
  );
}
