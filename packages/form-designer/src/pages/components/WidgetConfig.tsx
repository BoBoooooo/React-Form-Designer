/*
 * @file: 配置面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:08:48
 */
import React, { useState, useEffect, useContext } from 'react';
import { Form, Tabs, Radio, InputNumber, Input, Switch } from 'antd';
import { FormContext } from '../../context/global';
import optionsConfig from '../../config/optionsConfig';

const { Item } = Form;
const { TabPane } = Tabs;

// 字段属性配置
const PropConfig = ({ setSelectedWidget, selectedWidget }) => {
  const [form] = Form.useForm();

  // 回调更新全局json中的配置
  const onValuesChange = value => {
    console.log('配置更新', value);
    setSelectedWidget(v => {
      const temp = { ...v };
      Object.keys(value).forEach(key => {
        if (key.includes('option_')) {
          temp!.options[key!.replace('option_', '')] = value[key];
        } else {
          temp[key] = value[key];
        }
      });
      return temp;
    });
  };

  useEffect(() => {
    console.log('effect', selectedWidget);
    const value: {
      options?: object;
      [key: string]: any;
    } = JSON.parse(JSON.stringify(selectedWidget)) || {};
    if (Object.keys(value).length === 0) {
      form.resetFields();
      return;
    }
    Object.keys(value.options || {}).forEach(option => {
      value['option_' + option] = (value.options || {})[option];
    });
    delete value.options;
    console.log('配置表单当前值', value);
    form.setFieldsValue(value);
  }, [selectedWidget]);

  return (
    <div>
      <Form layout="vertical" form={form} size="small" onValuesChange={onValuesChange}>
        <Item label="字段标识" name="model">
          <Input placeholder="请输入字段标识" />
        </Item>
        <Item label="标题" name="name">
          <Input placeholder="请输入标题" />
        </Item>
        {/* 遍历当前组件配置项 */}
        {Object.entries(selectedWidget.options || {}).map(([key]) => {
          const config = optionsConfig[key];
          if (config) {
            const { label, type: DynamicDom, props } = config.multi ? config[selectedWidget.type] : config;
            return (
              <Item key={label} label={label} name={'option_' + key}>
                <DynamicDom placeholder={'请输入' + label} {...props} />
              </Item>
            );
          }
        })}
      </Form>
    </div>
  );
};

// 表单属性配置
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
        <Item label="表单尺寸">
          <Radio.Group value={formSize} onChange={e => setFormSize(e.target.value)}>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Item>
        <Item label="标签布局">
          <Radio.Group value={formLayout} onChange={e => setFormLayout(e.target.value)}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Item>
        <Item label="标签对齐方式">
          <Radio.Group value={formAlign} onChange={e => setFormAlign(e.target.value)}>
            <Radio.Button value="left">left</Radio.Button>
            <Radio.Button value="right">right</Radio.Button>
          </Radio.Group>
        </Item>
        <Item label="标签宽度">
          <InputNumber min={80} max={200} defaultValue={formLabelWidth} onChange={e => setFormLabelWidth(e)} />
        </Item>
      </Form>
    </div>
  );
};

export default function WidgetConfig(props) {
  return (
    <div
      style={{
        padding: '0 10px',
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="字段属性" key="1">
          <PropConfig {...props}></PropConfig>
        </TabPane>
        <TabPane tab="表单属性" key="2">
          <FormConfig {...props}></FormConfig>
        </TabPane>
      </Tabs>
    </div>
  );
}
