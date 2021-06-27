/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import { Form, Button, Modal, ConfigProvider } from 'antd';
import BFormItem from './BFormItem';
import formJsonType from '../types';
import BFormLayout from './BFormLayout';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh');

export default function (props: { widgetForm: formJsonType }) {
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
          {widgetForm.list.map(component => {     // 此处判断是栅格布局嵌套还是直接拖拽组件
            if (component.type === 'Row') {
              return <BFormLayout key={component.key} component={component} {...props}></BFormLayout>;
            } else {
              return <BFormItem key={component.key} component={component} {...props}></BFormItem>;
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
              提交表单
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
}
