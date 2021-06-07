/*
 * @file: 配置面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:08:48
 */
import React, { useState, useEffect, useContext } from 'react';
import { Form, Tabs, Radio, InputNumber } from 'antd';
import { FormContext } from '../../context/global';

const { TabPane } = Tabs;

const PropConfig = () => {
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      字段属性
    </div>
  );
};

const FormConfig = () => {
  const { widgetForm, setWidgetForm } = useContext(FormContext);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState(widgetForm.config.labelPosition);
  const [formSize, setFormSize] = useState(widgetForm.config.size);
  const [formLabelWidth, setFormLabelWidth] = useState(widgetForm.config.labelWidth);
  const [formAlign, setFormAlign] = useState(widgetForm.config.labelAlign);

  // 更新表单尺寸/标签位置/标签宽度
  useEffect(() => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.config.size = formSize;
      temp.config.labelPosition = formLayout;
      temp.config.labelWidth = formLabelWidth;
      temp.config.labelAlign = formAlign;

      return temp;
    });
  }, [formSize, formLabelWidth, formLayout, formAlign]);

  return (
    <div>
      <Form layout="vertical" form={form} size="small">
        <Form.Item label="表单尺寸">
          <Radio.Group value={formSize} onChange={e => setFormSize(e.target.value)}>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标签布局">
          <Radio.Group value={formLayout} onChange={e => setFormLayout(e.target.value)}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标签对齐方式">
          <Radio.Group value={formAlign} onChange={e => setFormAlign(e.target.value)}>
            <Radio.Button value="left">left</Radio.Button>
            <Radio.Button value="right">right</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标签宽度">
          <InputNumber min={80} max={200} defaultValue={formLabelWidth} onChange={e => setFormLabelWidth(e)} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default function Config(props) {
  return (
    <div
      style={{
        padding: '0 10px',
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="字段属性" key="1">
          <PropConfig></PropConfig>
        </TabPane>
        <TabPane tab="表单属性" key="2">
          <FormConfig {...props}></FormConfig>
        </TabPane>
      </Tabs>
    </div>
  );
}
