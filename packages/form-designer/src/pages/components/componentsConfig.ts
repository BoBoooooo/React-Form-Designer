/*
 * @file: 物料库枚举
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:18:34
 */
import { Input, Select, Radio, TimePicker, DatePicker, TreeSelect, Cascader, Switch, Checkbox, InputNumber, Rate, Slider, Button, Upload, Avatar, Grid, Tabs, Divider } from 'antd';

const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

// 基础组件
const basicComponents = [
  {
    type: 'Input',
    name: '单行文本',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/keyboard',
    options: {
      allowClear: true,
      bordered: true,
      width: '100%',
      id: '',
      disabled: false,
      required: false,
      maxLength: null,
      placeholder: '',
    },
  },
  {
    type: 'TextArea',
    name: '多行文本',
    icon: 'regular/keyboard',
    labelWidth: undefined,
    hidden: false,
    options: {
      width: '100%',
      allowClear: true,
      bordered: true,
      showCount: false,
      autoSize: false,
      required: false,
      maxLength: null,
      placeholder: '',
    },
  },
  {
    type: 'InputNumber',
    name: '计数器',
    icon: 'sort-numeric-up',
    labelWidth: undefined,
    hidden: false,
    options: {
      width: '100%',
      bordered: true,
      min: null,
      max: null,
      step: 1,
      disabled: false,
      readOnly: false,
      required: false,
      // 字符值模式，开启后支持高精度小数。同时 onChange 将返回 string 类型
      stringMode: false,
    },
  },
  {
    type: 'RadioGroup',
    name: '单选框组',
    icon: 'regular/dot-circle',
    labelWidth: undefined,
    hidden: false,
    options: {
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
      ],
      disabled: false,
      width: '100%',
      remote: 'static',
      required: false,
      // 用于设置 Radio options 类型
      optionType: 'default',
    },
    custom: {
      remote: false,
      remoteOptions: [],
      remoteFunc: '',
      labelWidth: undefined,
      hidden: false,
    },
  },
  {
    type: 'CheckboxGroup',
    name: '多选框组',
    icon: 'regular/check-square',
    options: {
      disabled: false,
      required: false,
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
      ],
      width: '100%',
    },
    custom: {
      remote: false,
      remoteOptions: [],
      remoteFunc: '',
      labelWidth: undefined,
      hidden: false,
    },
  },
  {
    type: 'DatePicker',
    name: '日期选择器',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/calendar-alt',
    options: {
      required: false,
      bordered: true,
      allowClear: true,
      className: '',
      disabled: false,
      placeholder: '',
      mode: 'date', // 	time | date | month | year | decade
      format: 'YYYY-MM-DD',
      width: '100%',
      showNow: false,
      showTime: false,
      showToday: false,
    },
  },
  {
    type: 'TimePicker',
    name: '时间选择器',
    labelWidth: undefined,
    hidden: false,
    icon: 'clock',
    options: {
      bordered: true,
      required: false,
      allowClear: true,
      className: '',
      disabled: false,
      placeholder: '请选择时间',
      clearText: null,
      format: 'HH:mm:ss',
      width: '100%',
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
      showNow: true,
      use12Hours: false,
    },
  },
  {
    type: 'Rate',
    name: '评分',
    icon: 'regular/star',
    labelWidth: undefined,
    hidden: false,
    options: {
      required: false,
      className: '',
      allowClear: true,
      count: 5,
      disabled: false,
      allowHalf: false,
    },
  },
  {
    type: 'Select',
    name: '下拉选择框',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/caret-square-down',
    options: {
      required: false,
      allowClear: false,
      autoClearSearchValue: true,
      defaultActiveFirstOption: true,
      defaultOpen: null,
      bordered: true,
      disabled: false,
      placeholder: '',
      listHeight: 256,
      maxTagCount: null,
      maxTagTextLength: null,
      mode: '', //multiple | tags
      optionFilterProp: 'label', // label | value
      optionLabelProp: 'label',
      showSearch: true,
      virtual: true,
      width: '100%',
      options: [
        {
          value: '选项1',
          label: '选项1',
        },
        {
          value: '选项2',
          label: '选项2',
        },
        {
          value: '选项3',
          label: '选项3',
        },
      ],
    },
    custom: {
      remote: 'static',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
    },
  },
  {
    type: 'Switch',
    name: '开关',
    labelWidth: undefined,
    hidden: false,
    icon: 'toggle-off',
    options: {
      required: false,
      className: '',
      size: 'default', // default | small
      disabled: false,
      defaultChecked: false,
      checkedChildren: null,
    },
  },
  {
    type: 'Slider',
    name: '滑块',
    icon: 'sliders-h',
    labelWidth: undefined,
    hidden: false,
    options: {
      required: false,
      allowClear: false,
      disabled: false,
      dots: false,
      included: true,
      min: 0,
      max: 100,
      step: 1,
      reverse: false,
      tooltipPlacement: null,
      range: false,
      vertical: false,
      width: '100%',
    },
  },
  {
    type: 'Cascader',
    name: '级联选择器',
    icon: 'random',
    labelWidth: undefined,
    options: {
      required: false,
      width: '100%',
      className: '',
      placeholder: '',
      changeOnSelect: false,
      expandTrigger: 'click',
      notFoundContent: null,
      popupPlacement: 'bottomLeft', // bottomLeft | bottomRight | topLeft | topRight
      allowClear: true,
      multiple: false,
      disabled: false,
      bordered: true,
      showSearch: true,
      fieldNames: { label: 'label', value: 'value', children: 'children' },
      options: [
        {
          value: 'A',
          label: 'A',
          children: [
            {
              value: 'AA',
              label: 'AA',
              children: [
                {
                  value: 'AAA',
                  label: 'AAA',
                },
              ],
            },
          ],
        },
      ],
    },
    custom: {
      remote: 'static',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
      remoteFunc: '',
    },
  },
  {
    type: 'TreeSelect',
    name: '树形下拉框',
    icon: 'tree',
    labelWidth: undefined,
    options: {
      required: false,
      allowClear: false,
      autoClearSearchValue: true,
      disabled: false,
      bordered: true,
      listHeight: 256,
      maxTagCount: null,
      multiple: false,
      placeholder: '',
      showArrow: true,
      showSearch: true,
      treeCheckable: false,
      treeCheckStrictly: false,
      treeDefaultExpandAll: false,
      virtual: true,
      width: '100%',
      treeData: [
        {
          value: '测试数据A',
          title: '测试数据A',
          children: [
            {
              value: '测试数据AA',
              title: '测试数据AA',
            },
            {
              value: '测试数据AB',
              title: '测试数据AB',
            },
          ],
        },
        {
          value: '测试数据B',
          title: '测试数据B',
        },
        {
          value: '测试数据C',
          title: '测试数据C',
        },
      ],
    },
  },
];

// 高级组件
const advanceComponents = [
  {
    type: 'Button',
    name: '按钮',
    icon: 'mouse-pointer',
    labelWidth: undefined,
    hidden: false,
    options: {
      text: '确认',
      eventName: 'btnCallback',
      btnType: 'primary',
      hiddenLabel: true,
    },
  },
  {
    type: 'Upload',
    name: '附件',
    icon: 'upload',
    labelWidth: undefined,
    options: {
      resourceId: 'id',
      fileType: '',
      defaultValue: '',
      remoteFunc: '',
      readonly: false,
      hiddenLabel: false,
    },
  },
  {
    type: 'Avatar',
    name: '头像',
    icon: 'user',
    labelWidth: undefined,
    options: {
      resourceId: 'id',
      uploadUrl: '/file/upload',
      width: '180px',
      hiddenLabel: true,
    },
  },
  {
    type: 'Table',
    name: '子表格',
    icon: 'table',
    labelWidth: undefined,
    options: {
      remoteFunc: '',
      visibleList: {
        actionColumnBtnEdit: true,
        actionColumnBtnDetail: false,
        btnAdd: true,
        actionColumn: true,
        tableTitle: false,
        searchForm: false,
        actionColumnBtnDel: true,
      },
      tableParams: '',
      prefill: '',
      tableTitle: '',
      showPagination: true,
      isMultiple: false,
      tableName: '',
      tableDesignerName: '',
      dialogFormDesignerName: '',
      hiddenLabel: false,
    },
  },
  {
    type: 'Form',
    name: '子表单',
    icon: 'file-word',
    labelWidth: undefined,
    tableColumns: [],
    options: {
      hiddenLabel: true,
      remote: 'custom',
      remoteFunc: '',
      tableParams: '',
      prefill: '',
      tableName: '',
    },
  },
];

// 布局组件
const layoutComponents = [
  {
    type: 'Grid',
    name: '栅格布局',
    icon: 'th',
    columns: [
      {
        span: 24,
        list: [],
      },
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
    },
  },
  {
    type: 'grid-table',
    name: '表格布局',
    icon: 'table',
    beta: true,
    options: {
      borderWidth: 1,
      borderColor: '#999',
      width: '100%',
      sumColSpan: 1,
      sumRowSpan: 1,
    },
    rows: [
      {
        columns: [],
      },
    ],
  },
  {
    type: 'Tabs',
    name: '标签页',
    icon: 'tags',
    beta: true,
    items: [
      {
        name: '标签页1',
        label: '标签页1',
        list: [],
      },
    ],
    options: {
      type: '',
      hiddenLabel: true,
      position: 'top',
    },
  },
  {
    type: 'Divider',
    name: '分割线',
    icon: 'divide',
    labelWidth: undefined,
    options: {
      align: 'center',
      hiddenLabel: true,
    },
  },
];

// 图表组件
const chartComponents = [
  {
    type: 'chart-common',
    name: '通用图表',
    icon: 'chart-bar',
    options: {
      className: '',
      height: '400px',
      hiddenLabel: true,
      width: '100%',
      loop: false,
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      },
    },
  },
];

export const components = [
  {
    label: '表单组件',
    list: basicComponents,
  },
  {
    label: '高级/异步组件',
    list: advanceComponents,
  },
  {
    label: '布局组件',
    list: layoutComponents,
  },
  {
    label: '图表组件',
    list: chartComponents,
  },
];

export default {
  Input,
  TextArea,
  Select,
  Radio,
  RadioGroup,
  TimePicker,
  DatePicker,
  TreeSelect,
  Cascader,
  Switch,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  Rate,
  Slider,
  Button,
  Upload,
  Avatar,
  Grid,
  Tabs,
  Divider,
};
