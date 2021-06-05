/*
 * @file: 物料库 拖拽
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 11:21:14
 */

import React from 'react';
import { basicComponents } from './componentsConfig';
import styles from '../../styles/material.module.scss';
import { StarOutlined } from '@ant-design/icons';

export default function Material({ addWidget }) {
  const onDragStart = (ev, com) => {
    ev.dataTransfer.setData('Text', JSON.stringify(com));
  };
  const add = widget => {
    addWidget(widget);
  };
  return (
    <div>
      <div>
        <div className={styles.title}>表单组件</div>
        {basicComponents.map(com => (
          <div key={com.type} className={styles.component} draggable id={'bform_component_' + com.type} onDragStart={ev => onDragStart(ev, com)} onClick={() => add(com)}>
            <StarOutlined className={styles.icon} />
            <span>{com.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
