/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import form_empty from '../../assets/form_empty.svg';
import styles from '../../styles/panel.module.scss';

export default function Panel() {
  const drop = ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('Text');
    ev.target.appendChild(document.getElementById(data));
  };
  const allowDrop = ev => {
    ev.preventDefault();
  };
  return (
    <div className={styles.container} onDrop={drop} onDragOver={allowDrop}>
      <div className={styles['form-empty']}>
        <img
          src={form_empty}
          style={{
            width: '16em',
            height: '16em',
          }}
          alt="logo"
        />
        <span>拖拽 或 点击 添加组件至此处!</span>
      </div>
    </div>
  );
}
