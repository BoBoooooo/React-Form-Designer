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
  // const handleSelect = () => {
  //   console.log('选中', component);
  // };

  return (
    <Form.Item label={component.name} name={component.model}>
      {/* <Input placeholder={component.options.placeholder}></Input> */}
      {React.createElement(AntdComs[component.type], component.options)}
    </Form.Item>
  );
}
