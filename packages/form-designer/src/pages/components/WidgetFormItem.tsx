/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React from 'react';
import { Form } from 'antd';
import AntdComs from './componentsConfig';

export default function WidgetFormItem({ component }) {
  const handleSelect = e => {
    console.log('选中', component);
    e.preventDefault();
  };

  const getValuePropName = type => {
    return type === 'Switch' ? 'checked' : '';
  };

  return (
    <div onClick={handleSelect}>
      <Form.Item label={component.name} name={component.model} valuePropName={getValuePropName(component.type)}>
        {React.createElement(AntdComs[component.type], component.options)}
      </Form.Item>
    </div>
  );
}
