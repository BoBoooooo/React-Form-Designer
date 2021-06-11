/*
 * @file: 布局类组件
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-08 16:30:59
 */

import React from 'react';
import { Row, Col } from 'antd';
import BFormItem from './BFormItem';

export default function BFormLayout({ component }) {
  /**  end  拖拽相关代码 */
  return (
    <div>
      <Row gutter={component.options.gutter ? component.options.gutter : 0} justify={component.options.justify} align={component.options.align}>
        {component.columns.map(col => {
          return (
            <Col>
              {col.list.map(el => {
                return <BFormItem key={el.key} component={el}></BFormItem>;
              })}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
