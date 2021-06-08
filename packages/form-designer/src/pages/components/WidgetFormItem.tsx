/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React, { useContext } from 'react';
import { Form } from 'antd';
import AntdComs from './componentsConfig';
import { FormContext } from '../../context/global';
import styles from '../../styles/panel.module.scss';
import { DragOutlined } from '@ant-design/icons';

export default function WidgetFormItem({ component, setSelectedWidget, selectedWidget }) {
  const { widgetForm } = useContext(FormContext);

  const handleSelect = e => {
    setSelectedWidget(component);
    console.log('选中', component);

    e.preventDefault();
  };

  const getValuePropName = type => {
    return type === 'Switch' ? 'checked' : 'value';
  };

  return (
    <div onClick={handleSelect} className={[styles['widget-view'], component.key === selectedWidget.key ? styles.active : null].join(' ')}>
      <Form.Item
        rules={[{ required: component.options.required }]}
        labelAlign={widgetForm.config.labelAlign}
        label={component.name}
        name={component.model}
        valuePropName={getValuePropName(component.type)}
      >
        {React.createElement(AntdComs[component.type], component.options)}
      </Form.Item>
      {/* 右上角model显示 */}
      <div className={styles['widget-view-model']}>
        <span>{component.model}</span>
      </div>
      {/* 左上角可拖拽按钮 */}
      {component.key === selectedWidget.key && (
        <div className={styles['widget-view-drag']}>
          <DragOutlined />
        </div>
      )}
    </div>
  );
}
