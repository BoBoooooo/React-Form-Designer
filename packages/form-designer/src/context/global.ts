/*
 * @file: 全局form context
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-07 10:41:56
 */
import React from 'react';
import { formJsonType } from './../types/form.d';

interface contextType {
  widgetForm: formJsonType;
  setWidgetForm: (value: React.SetStateAction<formJsonType>) => void;
  addWidget: (item: object, dragIndex?: number | undefined) => void;
  deleteWidget: (index) => void;
  cloneWidget: (com: object, index: number) => void;
}

export const FormContext = React.createContext<contextType>({
  widgetForm: {
    list: [],
    config: {
      labelWidth: 140,
      labelPosition: 'horizontal',
      size: 'middle',
      labelAlign: 'right',
    },
  },
  setWidgetForm: () => {},
  addWidget: () => {},
  deleteWidget: () => {},
  cloneWidget: () => {},
});
