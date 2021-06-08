/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React, { useContext } from 'react';
import form_empty from '../../assets/form_empty.svg';
import styles from '../../styles/panel.module.scss';
import { Form, Button, Modal } from 'antd';
import WidgetFormItem from './WidgetFormItem';
import { formJsonType } from '../../types/form.d';
import { FormContext } from '../../context/global';

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

const FormWrapper = (props: { widgetForm: formJsonType; selectedWidget: Record<string, any>; setSelectedWidget: Function }) => {
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
      <Form labelCol={{ style: { width: widgetForm.config.labelWidth } }} layout={widgetForm.config.labelPosition} size={widgetForm.config.size} form={form} initialValues={{}} onFinish={onFinish}>
        {widgetForm.list.map(component => (
          <WidgetFormItem key={component.key} component={component} {...props}></WidgetFormItem>
        ))}
        {/* Submit按钮 */}
        <Form.Item
          wrapperCol={{
            offset: 22,
          }}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            获取表单值
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default function Panel(props) {
  const { addWidget } = useContext(FormContext);

  const drop = ev => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('Text'));

    console.log('拖拽物料至表单', data);
    ev.target.style['border-bottom'] = 'unset';
    addWidget(data);
  };

  const allowDrop = ev => {
    if (ev.target.className.includes('widget-view')) {
      ev.target.style['border-bottom'] = '3px solid purple';
    }

    ev.preventDefault();
  };

  const onDragLeave = ev => {
    if (ev.target.className.includes('widget-view')) {
      ev.target.style['border-bottom'] = 'unset';
    }
  };

  return (
    <div className={styles['widget-container']} onDrop={drop} onDragOver={allowDrop} onDragLeave={onDragLeave}>
      {/* 表单没内容时显示暂无数据 */}
      {props.widgetForm.list?.length === 0 ? <Empty></Empty> : <FormWrapper {...props}></FormWrapper>}
    </div>
  );
}
