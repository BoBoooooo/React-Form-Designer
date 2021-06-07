/*
 * @file: 工具函数
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-07 11:10:14
 */
import { random } from './generator';

export const widgetClone = (origin: any) => {
  const {
    type = 'type',
    options: { remoteOptions },
  } = origin;
  const key = `${type}_${random()}`;
  const cloneOrigin = JSON.parse(
    JSON.stringify({
      ...origin,
      key,
      model: key,
      rules: [],
    })
  );
  if (remoteOptions) {
    cloneOrigin.options.remoteFunc = `func_${key}`;
  }
  if (cloneOrigin.options.placeholder !== undefined) {
    cloneOrigin.options.placeholder = `请填写${cloneOrigin.name}`;
  }
  return cloneOrigin;
};
