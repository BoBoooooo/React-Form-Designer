/*
 * @file: 配置面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:08:48
 */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Form, Tabs, Radio, InputNumber, Input, Space, Button, Switch } from 'antd';
import { FormContext } from '../../context/global';
import optionsConfig from '../../config/optionsConfig';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item } = Form;
const { TabPane } = Tabs;

// 静态数据增删改
const DynamicArray = ({ name }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }, index) => (
            <Item {...restField} label={index === 0 ? '静态选项' : ''} required={false} key={fieldKey}>
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Item {...restField} name={[name, 'label']} fieldKey={[fieldKey, 'label']} rules={[{ required: true, message: '请输入label' }]}>
                  <Input placeholder="label" />
                </Item>
                <Item {...restField} name={[name, 'value']} fieldKey={[fieldKey, 'value']} rules={[{ required: true, message: '请输入value' }]}>
                  <Input placeholder="value" />
                </Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            </Item>
          ))}
          <Item>
            <Button
              type="dashed"
              onClick={() =>
                add({
                  label: '',
                  value: '',
                })
              }
              block
              icon={<PlusOutlined />}
            >
              新增Option
            </Button>
          </Item>
        </>
      )}
    </Form.List>
  );
};

// 字段属性配置
const PropConfig = ({ setSelectedWidget, selectedWidget }) => {
  const [form] = Form.useForm();

  const isSelected = useMemo(() => {
    return Object.keys(selectedWidget).length > 0;
  }, [selectedWidget]);

  // 回调更新全局json中的配置
  const onValuesChange = (changedValues, allValues) => {
    setSelectedWidget(v => {
      const temp = { ...v };
      Object.keys(changedValues).forEach(key => {
        if (key.includes('option_')) {
          temp!.options[key!.replace('option_', '')] = allValues[key];
        } else {
          temp[key] = changedValues[key];
        }
      });
      return temp;
    });
  };

  const getValuePropName = type => {
    return type === Switch ? 'checked' : 'value';
  };

  // 初始化表单数据
  useEffect(() => {
    const value: {
      options?: object;
      [key: string]: any;
    } = JSON.parse(JSON.stringify(selectedWidget)) || {};
    if (!isSelected) {
      form.resetFields();
      return;
    }
    Object.keys(value.options || {}).forEach(option => {
      value['option_' + option] = (value.options || {})[option];
    });
    delete value.options;
    console.log('配置表单当前值', value);
    form.setFieldsValue(value);
  }, [selectedWidget, isSelected, form]);
  return (
    <div>
      <Form layout="vertical" form={form} size="small" onValuesChange={onValuesChange}>
        {isSelected && (
          <>
            <Item label="字段标识" name="model">
              <Input placeholder="请输入字段标识" />
            </Item>
            <Item label="标题" name="name">
              <Input placeholder="请输入标题" />
            </Item>
          </>
        )}
        {/* 遍历当前组件配置项 */}
        {Object.entries(selectedWidget.options || {}).map(([key]) => {
          const config = optionsConfig[key];
          if (config) {
            const { label, type: DynamicDom, props } = config.multi ? config[selectedWidget.type] : config;
            if (DynamicDom === 'ArrayControl') {
              return <DynamicArray key={label} name={'option_' + key}></DynamicArray>;
            } else {
              return (
                <Item valuePropName={getValuePropName(DynamicDom)} key={label} label={label} name={'option_' + key}>
                  <DynamicDom placeholder={'请输入' + label} {...props} />
                </Item>
              );
            }
          }
          return null;
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
  }, [formSize, formLabelWidth, formLayout, formAlign, setWidgetForm]);

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
