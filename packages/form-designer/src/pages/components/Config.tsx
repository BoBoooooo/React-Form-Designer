/*
 * @file: 配置面板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:08:48
 */
import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const PropConfig = () => {
  return <div>字段属性</div>;
};

const FormConfig = () => {
  return <div>表单属性</div>;
};

export default function Config() {
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="字段属性" key="1">
          <PropConfig></PropConfig>
        </TabPane>
        <TabPane tab="表单属性" key="2">
          <FormConfig></FormConfig>
        </TabPane>
      </Tabs>
    </div>
  );
}
