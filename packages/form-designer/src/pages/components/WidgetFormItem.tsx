/*
 * @file: Form.Item二次封装
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 21:30:28
 */
import React, { useContext } from 'react';
import { Form, Tooltip, message } from 'antd';
import AntdComs from '../../config/componentsConfig';
import { FormContext } from '../../context/global';
import styles from '../../styles/panel.module.scss';
import { DragOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

export default function WidgetFormItem({ component, setSelectedWidget, selectedWidget, index, colIndex, rowIndex }) {
  const { widgetForm, deleteWidget, cloneWidget, cloneGridWidget, deleteGridWidget } = useContext(FormContext);

  const handleSelect = e => {
    setSelectedWidget(component);
    console.log('当前选中', component);
    e.preventDefault();
    e.stopPropagation();
  };

  const getValuePropName = type => {
    return type === 'Switch' ? 'checked' : 'value';
  };

  const onDragStart = (ev, com) => {
    console.log('开始拖拽', ev, index);
    const dom = { ...com };
    // 记录拖拽之前的索引位置
    dom._index = index;
    ev.dataTransfer.setData('Text', JSON.stringify(dom));
    ev.dataTransfer.effectAllowed = 'move';
  };

  const handleWidgetClone = () => {
    if (rowIndex !== null && colIndex !== null) {
      cloneGridWidget(component, rowIndex, colIndex, index);
    } else {
      cloneWidget(component, index);
    }
  };
  const handleWidgetDelete = ev => {
    ev.stopPropagation();
    // 如果有值则表示该组件嵌套在栅格布局内
    console.log('删除组件,所在位置', rowIndex, colIndex);
    if (rowIndex !== null && colIndex !== null) {
      deleteGridWidget(rowIndex, colIndex, index);
    } else {
      deleteWidget(index);
    }
    message.success('删除成功');
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
    <div draggable onDragStart={ev => onDragStart(ev, component)} onClick={handleSelect} className={[styles['widget-view'], component.key === selectedWidget.key ? styles.active : null].join(' ')}>
      <Form.Item
        rules={[{ required: component.options.required, pattern: new RegExp(component.options.validatorPattern), type: component.options.validatorType, message: component.options.validatorMessage }]}
        labelAlign={widgetForm.config.labelAlign}
        label={component.name}
        name={component.model}
        valuePropName={getValuePropName(component.type)}
        tooltip={component.options.tooltip}
        className={styles['ant-form-item']}
      >
        {React.createElement(AntdComs[component.type], getProps(component), component.options.text)}
      </Form.Item>
      {/* 右上角model显示 */}
      <div className={styles['widget-view-model']}>
        <span>{component.model}</span>
      </div>
      {/* 操作按钮 */}
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
