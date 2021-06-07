/*
 * @file: 物料库 拖拽
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 11:21:14
 */

import React, { useContext } from 'react';
import { components } from './componentsConfig';
import styles from '../../styles/material.module.scss';
import { StarOutlined } from '@ant-design/icons';
import { FormContext } from '../../context/global';

export default function Material() {
  const { addWidget } = useContext(FormContext);

  const onDragStart = (ev, com) => {
    ev.dataTransfer.setData('Text', JSON.stringify(com));
  };
  const add = widget => {
    addWidget(widget);
  };
  return (
    <div>
      {components.map(com => {
        return (
          <div className={styles.wrapper}>
            <div className={styles.title}>{com.label}</div>
            {com.list.map(item => {
              return (
                <div key={item.type} className={styles.component} draggable id={'bform_component_' + item.type} onDragStart={ev => onDragStart(ev, item)} onClick={() => add(item)}>
                  <StarOutlined className={styles.icon} />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        );
      })}
      <div></div>
    </div>
  );
}
