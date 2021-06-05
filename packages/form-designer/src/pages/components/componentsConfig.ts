/*
 * @file: 物料库枚举
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 12:18:34
 */
import { Input, Select, Radio, TimePicker, DatePicker, TreeSelect, Cascader, Switch, Checkbox, InputNumber, Rate, Slider } from 'antd';

const { TextArea } = Input;

// 基础组件
const basicComponents = [
  {
    type: 'Input',
    name: '单行文本',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/keyboard',
    options: {
      width: '100%',
      defaultValue: '',
      readonly: false,
      disabled: false,
      showWordLimit: false,
      required: false,
      dataType: 'string',
      pattern: '',
      maxLength: '',
      placeholder: '',
      hiddenLabel: false,
      appendButton: false, // 后缀功能按钮
    },
  },
  {
    type: 'Textarea',
    name: '多行文本',
    icon: 'regular/keyboard',
    labelWidth: undefined,
    hidden: false,
    options: {
      width: '100%',
      defaultValue: '',
      readonly: false,
      disabled: false,
      showWordLimit: false,
      required: false,
      maxLength: '',
      pattern: '',
      placeholder: '',
      hiddenLabel: false,
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
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      hiddenLabel: false,
    },
  },
  {
    type: 'Radio',
    name: '单选框组',
    icon: 'regular/dot-circle',
    labelWidth: undefined,
    hidden: false,
    options: {
      inline: true,
      defaultValue: '',
      showLabel: false,
      hiddenLabel: false,
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
      required: false,
      disabled: false,
      width: '100%',
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
    type: 'Checkbox',
    name: '多选框组',
    icon: 'regular/check-square',
    labelWidth: undefined,
    hidden: false,
    options: {
      inline: true,
      buttonStyle: false,
      defaultValue: [],
      showLabel: false,
      disabled: false,
      min: null,
      max: null,
      hiddenLabel: false,
      options: [
        {
          value: '选项1',
        },
        {
          value: '选项2',
        },
        {
          value: '选项3',
        },
      ],
      required: false,
      width: '100%',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
    },
  },
  {
    type: 'DatePicker',
    name: '日期选择器',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/calendar-alt',
    options: {
      hiddenLabel: false,
      defaultValue: false,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '100%',
    },
  },
  {
    type: 'TimePicker',
    name: '时间选择器',
    labelWidth: undefined,
    hidden: false,
    icon: 'clock',
    options: {
      hiddenLabel: false,
      defaultValue: false,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'datetime',
      format: 'hh:mm:ss',
      timestamp: false,
      required: false,
      width: '100%',
    },
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'regular/star',
    labelWidth: undefined,
    hidden: false,
    options: {
      hiddenLabel: false,
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
    },
  },
  {
    type: 'Select',
    name: '下拉选择框',
    labelWidth: undefined,
    hidden: false,
    icon: 'regular/caret-square-down',
    options: {
      hiddenLabel: false,
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      allowCreate: false,
      width: '100%',
      options: [
        {
          value: '下拉框1',
        },
        {
          value: '下拉框2',
        },
        {
          value: '下拉框3',
        },
      ],
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
      hiddenLabel: false,
      defaultValue: false,
      required: false,
      disabled: false,
    },
  },
  {
    type: 'Slider',
    name: '滑块',
    icon: 'sliders-h',
    labelWidth: undefined,
    hidden: false,
    options: {
      hiddenLabel: false,
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '100%',
    },
  },
  {
    type: 'Cascader',
    name: '级联选择器',
    icon: 'random',
    labelWidth: undefined,
    options: {
      defaultValue: [],
      width: '100%',
      separator: '/',
      placeholder: '',
      required: false,
      multiple: false,
      disabled: false,
      clearable: false,
      checkStrictly: false,
      remote: 'static',
      remoteOptions: [],
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
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
      remoteFunc: '',
      hiddenLabel: false,
    },
  },
  {
    type: 'Treeselect',
    name: '树形下拉框',
    icon: 'tree',
    labelWidth: undefined,
    options: {
      remoteFunc: '',
      placeholder: '',
      width: '100%',
      defaultValue: null,
      maxHeight: 300,
      multiple: false,
      remote: 'custom',
      appendToBody: false,
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
      clearable: true,
      searchable: true,
      noChildrenText: '暂无数据',
      noOptionsText: '暂无数据',
      noResultsText: '暂无数据',
      searchNested: true,
      required: false,
      showValueLabelSlot: false,
      disabled: false,
      showCount: false,
      disableBranchNodes: true,
      remoteOptions: [
        {
          value: '测试数据A',
          label: '测试数据A',
          children: [
            {
              value: '测试数据AA',
              label: '测试数据AA',
            },
            {
              value: '测试数据AB',
              label: '测试数据AB',
            },
          ],
        },
        {
          value: '测试数据B',
          label: '测试数据B',
        },
        {
          value: '测试数据C',
          label: '测试数据C',
        },
      ],
      hiddenLabel: false,
    },
  },
];

// 高级组件
const advanceComponents = [
  {
    type: 'button',
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
    type: 'upload',
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
    type: 'avatar',
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
    type: 'table',
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
    type: 'form',
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
    type: 'grid',
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
    type: 'tabs',
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
    type: 'divider',
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
  TimePicker,
  DatePicker,
  TreeSelect,
  Cascader,
  Switch,
  Checkbox,
  InputNumber,
  Rate,
  Slider,
};
