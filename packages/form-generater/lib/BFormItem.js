/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React from 'react';
import { Form } from 'antd';
import AntdComs from './config/componentsConfig';
export default function BFormItem({ component }) {
    const getValuePropName = type => {
        return type === 'Switch' ? 'checked' : 'value';
    };
    const getProps = component => {
        const { options: props, events } = component;
        // 注入事件
        if (events) {
            events.map(ev => {
                props[ev.name] = e => {
                    console.log(ev.name, e, component);
                };
            });
        }
        return props;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Form.Item, { rules: [{ required: component.options.required }], label: component.name, name: component.model, valuePropName: getValuePropName(component.type) }, React.createElement(AntdComs[component.type], getProps(component), component.options.text))));
}
