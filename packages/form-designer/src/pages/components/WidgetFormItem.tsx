/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React, { useContext } from 'react';
import { Form, Tooltip } from 'antd';
import AntdComs from './componentsConfig';
import { FormContext } from '../../context/global';
import styles from '../../styles/panel.module.scss';
import { DragOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

export default function WidgetFormItem({ component, setSelectedWidget, selectedWidget, index }) {
  const { widgetForm, deleteWidget, cloneWidget } = useContext(FormContext);

  const handleSelect = e => {
    setSelectedWidget(component);
    console.log('当前选中', component);
    e.preventDefault();
  };

  const getValuePropName = type => {
    return type === 'Switch' ? 'checked' : 'value';
  };

  const onDragStart = (ev, com) => {
    const temp = { ...com };
    // 添加一个临时标记位,标记当前组件所在位置
    temp.currentIndex = index;
    ev.dataTransfer.setData('Text', JSON.stringify(temp));
    ev.dataTransfer.effectAllowed = 'move';
  };

  const handleWidgetClone = () => {
    cloneWidget(component, index);
  };
  const handleWidgetDelete = () => {
    deleteWidget(index);
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

  return (
    <div draggable onDragStart={ev => onDragStart(ev, component)} onClick={handleSelect} className={[styles['widget-view'], component.key === selectedWidget.key ? styles.active : null].join(' ')}>
      <Form.Item
        rules={[{ required: component.options.required }]}
        labelAlign={widgetForm.config.labelAlign}
        label={component.name}
        name={component.model}
        valuePropName={getValuePropName(component.type)}
        className={styles['ant-form-item']}
      >
        {React.createElement(AntdComs[component.type], getProps(component), component.options.text)}
      </Form.Item>
      {/* 右上角model显示 */}
      <div className={styles['widget-view-model']}>
        <span>{component.model}</span>
      </div>
      {/* 左上角可拖拽按钮 */}
      {component.key === selectedWidget.key && (
        <>
          <div className={styles['widget-view-drag']}>
            <DragOutlined />
          </div>
          <div className={styles['widget-view-action']}>
            <Tooltip placement="bottom" title="复制">
              <CopyOutlined onClick={handleWidgetClone} />
            </Tooltip>
            <Tooltip placement="bottom" title="删除">
              <DeleteOutlined onClick={handleWidgetDelete} />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}
