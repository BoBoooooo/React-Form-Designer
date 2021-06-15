/*
 * @file: 布局类组件
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-08 16:30:59
 */

import React, { useContext } from 'react';
import { Row, Col, Tooltip } from 'antd';
import styles from '../../styles/panel.module.scss';
import { CopyOutlined, FileAddOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { FormContext } from '../../context/global';
import WidgetFormItem from './WidgetFormItem';
import { widgetClone } from '../../utils/form';

export default function WidgetLayout({ index, component, selectedWidget, setSelectedWidget }) {
  const { deleteWidget, setWidgetForm, cloneWidget } = useContext(FormContext);
  const handleSelect = e => {
    setSelectedWidget(component);
    console.log('当前选中', component);
    e.preventDefault();
    e.stopPropagation();
  };

  // 添加栅格
  const handleGridAdd = () => {
    setWidgetForm(value => {
      const temp = { ...value };
      temp.list.forEach(com => {
        if (com.key === component.key) {
          component.columns.push({
            span: 6,
            list: [],
          });
        }
      });
      return temp;
    });
  };
  // Row复制
  const handleGridClone = () => {
    cloneWidget(component, index);
  };

  // Row删除
  const handleGridDelete = () => {
    deleteWidget(index);
  };

  // 栅格内widget新增
  const addGridWidget = (item, rowIndex, colIndex) => {
    let newWidget;
    item.key ? (newWidget = { ...item }) : (newWidget = widgetClone(item));

    setWidgetForm(value => {
      const temp = { ...value };
      const row = temp.list[index];
      const { list: colList } = row.columns[colIndex];
      // 标明该组件目前是嵌套在栅格布局中
      newWidget['_widget'] = 'Row';
      newWidget['_rowIndex'] = rowIndex;
      newWidget['_colIndex'] = colIndex;
      newWidget['_index'] = colList.length;
      colList.push(newWidget);
      return temp;
    });
  };

  /**  start  拖拽相关代码 */
  const defaultBorderStyle = '1px dashed #ccc';
  const hoverBorderStyle = '3px solid #389e0d';
  const defaultColBgStyle = 'white';
  const hoverColBgStyle = '#c9e4ff';
  const changeDragStyle = (ev, type: 'hover' | 'default') => {
    let { target: dom } = ev;
    console.log(dom);
    if (dom) {
      if (dom.className.includes('widget-col-list')) {
        dom.style['background'] = type === 'hover' ? hoverColBgStyle : defaultColBgStyle;
      }
      if (dom.className.includes('widget-view')) {
        dom.style['border-bottom'] = type === 'hover' ? hoverBorderStyle : defaultBorderStyle;
      }
    }
  };
  const drop = (ev, rowIndex, colIndex) => {
    ev.preventDefault();
    ev.stopPropagation();
    const newWidget = JSON.parse(ev.dataTransfer.getData('Text'));
    changeDragStyle(ev, 'default');
    addGridWidget(newWidget, rowIndex, colIndex);
    setSelectedWidget(newWidget);
  };
  const allowDrop = ev => {
    changeDragStyle(ev, 'hover');
    ev.preventDefault();
  };

  const onDragLeave = ev => {
    changeDragStyle(ev, 'default');
  };
  /**  end  拖拽相关代码 */

  return (
    <div className={[styles['widget-col'], selectedWidget.key === component.key ? styles.active : null].join(' ')}>
      <Row onClick={handleSelect} gutter={component.options.gutter ? component.options.gutter : 0} justify={component.options.justify} align={component.options.align}>
        {component.columns.map((col, colIndex: number) => {
          return (
            <Col onDrop={ev => drop(ev, index, colIndex)} onDragOver={allowDrop} onDragLeave={onDragLeave} key={index} span={col.span ? col.span : 0} className={styles['widget-col-list']}>
              {col.list.map((el, i: number) => {
                return (
                  <WidgetFormItem rowIndex={index} colIndex={colIndex} key={el.key} index={i} component={el} setSelectedWidget={setSelectedWidget} selectedWidget={selectedWidget}></WidgetFormItem>
                );
              })}
            </Col>
          );
        })}
      </Row>

      {component.key === selectedWidget.key && (
        <>
          <div className={styles['widget-col-drag']}>
            <DragOutlined />
          </div>
          <div className={styles['widget-col-action']}>
            <Tooltip placement="bottom" title="添加列">
              <FileAddOutlined onClick={handleGridAdd} />
            </Tooltip>
            <Tooltip placement="bottom" title="复制">
              <CopyOutlined onClick={handleGridClone} />
            </Tooltip>
            <Tooltip placement="bottom" title="删除">
              <DeleteOutlined onClick={handleGridDelete} />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}
