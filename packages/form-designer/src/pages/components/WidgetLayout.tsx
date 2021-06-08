/*
 * @file: 布局类组件
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-08 16:30:59
 */

import React, { useContext } from 'react';
import { Row, Col, Tooltip } from 'antd';
import styles from '../../styles/panel.module.scss';
import { CopyOutlined, FileAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormContext } from '../../context/global';

export default function WidgetLayout({ index, component, selectedWidget, setSelectedWidget }) {
  const { deleteWidget, setWidgetForm } = useContext(FormContext);
  const handleSelect = e => {
    setSelectedWidget(component);
    console.log('当前选中', component);
    e.preventDefault();
  };

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
  const handleGridClone = () => {};

  const handleWidgetDelete = () => {
    deleteWidget(index);
  };

  return (
    <div className={[styles['widget-col'], selectedWidget.key === component.key ? styles.active : null].join(' ')}>
      <Row onClick={handleSelect} gutter={component.options.gutter ? component.options.gutter : 0} justify={component.options.justify} align={component.options.align}>
        {component.columns.map((col, index) => {
          return (
            <Col key={index} span={col.span ? col.span : 0}>
              {'col-' + index}
            </Col>
          );
        })}
      </Row>

      <div className={styles['widget-view-action']}>
        <Tooltip placement="bottom" title="添加列">
          <FileAddOutlined onClick={handleGridAdd} />
        </Tooltip>
        <Tooltip placement="bottom" title="复制">
          <CopyOutlined onClick={handleGridClone} />
        </Tooltip>
        <Tooltip placement="bottom" title="删除">
          <DeleteOutlined onClick={handleWidgetDelete} />
        </Tooltip>
      </div>
    </div>
  );
}
