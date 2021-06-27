/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import { Form, Button, Modal, ConfigProvider } from 'antd';
import BFormItem from './BFormItem';
import BFormLayout from './BFormLayout';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh');
export default function (props) {
    const [form] = Form.useForm();
    const { widgetForm } = props;
    // 通过 Form 的 Submit监听 得到字段值
    const onFinish = values => {
        Modal.info({
            title: '当前表单值为',
            content: JSON.stringify(values),
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ConfigProvider, { locale: zhCN },
            React.createElement(Form, { labelCol: { style: { width: widgetForm.config.labelWidth } }, layout: widgetForm.config.labelPosition, size: widgetForm.config.size, form: form, initialValues: {}, onFinish: onFinish },
                widgetForm.list.map(component => {
                    if (component.type === 'Row') {
                        return React.createElement(BFormLayout, { key: component.key, component: component, ...props });
                    }
                    else {
                        return React.createElement(BFormItem, { key: component.key, component: component, ...props });
                    }
                }),
                React.createElement(Form.Item, { wrapperCol: {
                        offset: 22,
                    }, style: {
                        textAlign: 'right',
                        marginTop: '10px',
                    } },
                    React.createElement(Button, { type: "primary", htmlType: "submit" }, "\u63D0\u4EA4\u8868\u5355"))))));
}
