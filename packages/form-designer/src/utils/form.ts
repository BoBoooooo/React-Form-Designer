/*
 * @file: 工具函数
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-07 11:10:14
 */
import { random } from './generator';
import cloneDeep from 'lodash/cloneDeep';

// 生成唯一key 例如 Input_4032
function generateKey(type) {
  return `${type}_${random()}`;
}

export const widgetClone = (origin: any) => {
  const {
    type = 'type',
    options: { remoteOptions },
  } = origin;

  // 生成唯一key
  const key = generateKey(type);
  // 深拷贝
  const cloneOrigin = cloneDeep({
    ...origin,
    key,
    model: key,
    rules: [],
  });
  // 如果是栅格布局内部每个栅格内的组件也需要重新生成唯一key
  if (type === 'Row') {
    const { columns } = cloneOrigin;
    columns.forEach(col => {
      const { list } = col;
      if (list) {
        list.forEach(widget => {
          widget.key = generateKey(widget.type);
          widget.model = widget.key;
          widget._rowIndex += 1;
        });
      }
    });
  } else {
    if (remoteOptions) {
      cloneOrigin.options.remoteFunc = `func_${key}`;
    }
    if (cloneOrigin.options.placeholder !== undefined) {
      cloneOrigin.options.placeholder = `请填写${cloneOrigin.name}`;
    }
  }
  return cloneOrigin;
};
