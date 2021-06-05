/*
 * @file: types
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 20:21:03
 */

export interface formJsonType {
  list: any[];
  config: {
    labelWidth: number;
    labelPosition: 'right' | 'top' | 'left';
    columnList: any[];
  };
}
