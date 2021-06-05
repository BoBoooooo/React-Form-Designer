/*
 * @file: 配置面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:08:48
 */
import React, { useState, useEffect } from 'react';
import { Form, Tabs, Radio } from 'antd';
type LayoutType = Parameters<typeof Form>[0]['layout'];

const { TabPane } = Tabs;

const PropConfig = () => {
  return <div>字段属性</div>;
};

const FormConfig = ({ setWidgetForm, widgetForm }) => {
  const [form] = Form.useForm();

  const [formLayout, setFormLayout] = useState<LayoutType>(widgetForm.config.labelPosition);
  const [formSize, setFormSize] = useState<LayoutType>(widgetForm.config.size);

  // 更新标签位置
  useEffect(() => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.config.labelPosition = formLayout;
      return temp;
    });
  }, [formLayout]);

  // 更新表单尺寸
  useEffect(() => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.config.size = formSize;
      return temp;
    });
  }, [formSize]);
  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item label="表单尺寸">
          <Radio.Group value={formSize} onChange={e => setFormSize(e.target.value)}>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="middle">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标签位置">
          <Radio.Group value={formLayout} onChange={e => setFormLayout(e.target.value)}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default function Config(props) {
  return (
    <div>
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
