/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React, { useContext } from 'react';
import { Form } from 'antd';
import AntdComs from '../../config/componentsConfig';
import { FormContext } from '../../context/global';

export default function BFormItem({ component }) {
  const { widgetForm } = useContext(FormContext);

  const getValuePropName = type => {
    return type === 'Switch' ? 'checked' : 'value';
  };

  const getProps = component => {
    const { options: props, events } = component;
    // 注入事件
    if (events) {
      events.forEach(ev => {
        props[ev.name] = e => {
          console.log(ev.name, e, component);
        };
      });
    }
    return props;
  };

  return (
    <>
      <Form.Item
        rules={[{ required: component.options.required, pattern: new RegExp(component.options.validatorPattern), type: component.options.validatorType, message: component.options.validatorMessage }]}
        labelAlign={widgetForm.config.labelAlign}
        label={component.name}
        name={component.model}
        tooltip={component.options.tooltip}
        valuePropName={getValuePropName(component.type)}
      >
        {React.createElement(AntdComs[component.type], getProps(component), component.options.text)}
      </Form.Item>
    </>
  );
}
