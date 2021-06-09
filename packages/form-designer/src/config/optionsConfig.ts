/*
 * @file: 配置信息枚举
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-09 15:51:36
 */
import { Input, Switch, InputNumber, Select } from 'antd';

// 不同类型字段用不同的组件控制
const type = {
  boolean: Switch,
  number: InputNumber,
  array: Switch,
  object: Switch,
  string: Input,
};

const widgetSelect = options =>
  options.map(v => ({
    label: v,
    value: v,
  }));

export default {
  className: {
    type: Input,
    label: 'className',
  },
  allowClear: {
    type: Switch,
    label: '清空按钮',
  },
  bordered: {
    type: Switch,
    label: '显示边框',
  },
  width: {
    type: Input,
    label: '组件宽度',
  },
  id: {
    type: Input,
    label: 'ID',
  },
  disabled: {
    type: Switch,
    label: '是否禁用',
  },
  required: {
    type: Switch,
    label: '是否必填',
  },
  maxLength: {
    type: Input,
    label: '最大长度',
  },
  placeholder: {
    type: Input,
    label: '占位符',
  },
  showCount: {
    type: Switch,
    label: '开启字数统计',
  },
  autoSize: {
    type: Switch,
    label: '是否自适应高度',
  },
  min: {
    type: InputNumber,
    label: '最小值',
  },
  max: {
    type: InputNumber,
    label: '最大值',
  },
  step: {
    type: InputNumber,
    label: '步长',
  },
  readOnly: {
    type: Switch,
    label: '是否只读',
  },
  stringMode: {
    type: Switch,
    label: '字符值模式',
  },
  options: {
    type: type.array,
    label: '静态选项',
  },
  optionType: {
    type: Select,
    label: 'option样式',
    props: {
      options: widgetSelect(['default', 'button']),
    },
  },
  mode: {
    multi: true,
    Select: {
      type: Select,
      label: '多选/Tags',
      props: {
        allowClear: true,
        options: widgetSelect(['multiple', 'tags']),
      },
    },
    DatePicker: {
      type: Select,
      label: '选择模式',
      props: {
        options: widgetSelect(['time', 'date', 'month', 'year', 'decade']),
      },
    },
  },
  format: {
    type: Input,
    label: '格式',
  },
  showNow: {
    type: Switch,
    label: '显示当前按钮',
  },
  showTime: {
    type: Switch,
    label: '显示时间选择',
  },
  showToday: {
    type: Switch,
    label: '显示当天按钮',
  },
  clearText: {
    type: Input,
    label: '清除按钮的提示文案',
    defaultValue: '清空',
  },
  hourStep: {
    type: InputNumber,
    label: '小时选项间隔',
  },
  minuteStep: {
    type: InputNumber,
    label: '分钟选项间隔',
  },
  secondStep: {
    type: InputNumber,
    label: '秒选项间隔',
  },
  use12Hours: {
    type: Switch,
    label: '使用12小时制',
  },
  count: {
    type: InputNumber,
    label: 'star总数',
  },
  allowHalf: {
    type: Switch,
    label: '是否允许半选',
  },
  autoClearSearchValue: {
    type: Switch,
    label: '是否在选中项后清空搜索框',
  },
  defaultActiveFirstOption: {
    type: Switch,
    label: '是否默认高亮第一个选项',
  },
  defaultOpen: {
    type: Switch,
    label: '是否默认展开下拉菜单',
  },
  listHeight: {
    type: InputNumber,
    label: '设置弹窗滚动高度',
  },
  maxTagCount: {
    type: InputNumber,
    label: '最多显示多少个tag',
  },
  maxTagTextLength: {
    type: InputNumber,
    label: '最大显示的tag文本长度',
  },
  optionFilterProp: {
    type: Input,
    label: '搜索时过滤对应的option属性',
  },
  optionLabelProp: {
    type: Input,
    label: '回填到选择框的 Option 的属性值',
  },
  showSearch: {
    type: Switch,
    label: '使单选模式可搜索',
  },
  virtual: {
    type: Switch,
    label: '虚拟滚动',
  },
  size: {
    type: Select,
    label: '组件大小',
    props: {
      options: widgetSelect(['default', 'small']),
    },
  },
  defaultChecked: {
    type: Switch,
    label: '初始是否选中',
  },
  dots: {
    type: Switch,
    label: '是否只能拖拽到刻度上',
  },
  included: {
    type: Switch,
    label: '包含关系/并列关系',
  },
  range: {
    type: Switch,
    label: '双滑块模式',
  },
  reverse: {
    type: Switch,
    label: '反向坐标轴',
  },
  tooltipPlacement: {
    type: Input,
    label: 'Tooltip展示位置',
  },
  vertical: {
    type: Switch,
    label: '是否为垂直方向',
  },
  changeOnSelect: {
    type: Switch,
    label: '点选每级菜单选项值都会发生变化',
  },
  expandTrigger: {
    type: Select,
    label: '次级菜单的展开方式',
    props: {
      options: widgetSelect(['click', 'hover']),
    },
  },
  notFoundContent: {
    type: Input,
    label: '当下拉列表为空时显示的内容',
  },
  popupPlacement: {
    type: Select,
    label: '浮层预设位置',
    props: {
      options: widgetSelect(['bottomLeft', 'bottomRight', 'topLeft', 'topRight']),
    },
  },
  fieldNames: {
    type: type.object,
    label: '自定义 options 中 label name children 的字段',
  },
  multiple: {
    type: Switch,
    label: '支持多选',
  },
  showArrow: {
    type: Switch,
    label: '是否显示下拉箭头',
  },
  treeCheckable: {
    type: Switch,
    label: '显示Checkbox',
  },
  treeCheckStrictly: {
    type: Switch,
    label: '父子节点选中状态关联',
  },
  treeDefaultExpandAll: {
    type: Switch,
    label: '默认展开所有树节点',
  },
  treeData: {
    type: type.array,
    label: '静态数据',
  },
  text: {
    type: Input,
    label: '文本内容',
  },
  href: {
    type: Input,
    label: '点击跳转的地址',
  },
  ghost: {
    type: Switch,
    label: '按钮背景透明',
  },
  shape: {
    type: Select,
    label: '设置按钮形状',
    props: {
      options: widgetSelect(['circle', 'round']),
    },
  },
  type: {
    type: Select,
    label: '按钮类型',
    props: {
      options: widgetSelect(['primary', 'ghost', 'dashed', 'link', 'text', 'default']),
    },
  },
  block: {
    type: Switch,
    label: '将按钮宽度调整为其父宽度的选项',
  },
};
