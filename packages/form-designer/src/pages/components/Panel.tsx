/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import form_empty from '../../assets/form_empty.svg';
import styles from '../../styles/panel.module.scss';

const Empty = () => {
  return (
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
  );
};

export default function Panel(props) {
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
      {/* 表单没内容时显示暂无数据 */}
      {props.widgetForm?.list?.length === 0 && <Empty></Empty>}
    </div>
  );
}
