/*
 * @file: 画布面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:34:08
 */
import React from 'react';
import { Button } from 'antd';
export default function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, null, "\u6D4B\u8BD5"),
        React.createElement("div", null, JSON.stringify(props.data))));
}
