/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import form_empty from '../../assets/form_empty.svg';
import styles from '../../styles/panel.module.scss';
import { Form, Button } from 'antd';
import WidgetFormItem from './WidgetFormItem';
import { formJsonType } from '../../types/form.d';

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

const FormWrapper = ({ widgetForm }: { widgetForm: formJsonType }) => {
  const [form] = Form.useForm();

  const onFormChange = formValue => {
    console.log('表单值为', formValue);
  };

  return (
    <>
      <Form
        labelCol={{ style: { width: widgetForm.config.labelWidth } }}
        layout={widgetForm.config.labelPosition}
        size={widgetForm.config.size}
        form={form}
        initialValues={{}}
        onValuesChange={onFormChange}
      >
        {widgetForm.list.map(component => (
          <WidgetFormItem key={component.key} component={component}></WidgetFormItem>
        ))}
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default function Panel(props) {
  const drop = ev => {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('Text'));
    console.log('拖拽物料至表单', data);
    props.addWidget(data);
  };

  const allowDrop = ev => {
    ev.preventDefault();
  };

  const onDragEnter = () => {
    // ev.target.style.background = 'purple';
  };
  return (
    <div className={styles.container} onDrop={drop} onDragEnter={onDragEnter} onDragOver={allowDrop}>
      {/* 表单没内容时显示暂无数据 */}
      {props.widgetForm.list?.length === 0 ? <Empty></Empty> : <FormWrapper {...props}></FormWrapper>}
    </div>
  );
}
