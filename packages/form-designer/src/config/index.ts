/*
 * @file: 设计器右上角操作按钮枚举
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-06-05 13:30:36
 */

export const handleBtns = [
  {
    label: '布局模式',
    icon: 'BgColorsOutlined',
  },
  {
    label: '预览模式',
    icon: 'SearchOutlined',
    divider: true,
  },
  {
    label: '导入JSON',
    icon: 'CloudUploadOutlined',
  },
  {
    label: '生成JSON',
    icon: 'CloudDownloadOutlined',
    script: 'handleGenerateJson',
  },
  {
    label: '生成代码',
    icon: 'CodeSandboxOutlined',
  },
  {
    label: '清空',
    icon: 'StarOutlined',
    script: 'ClearOutlined',
  },
  {
    label: '自动绑定',
    icon: 'TagOutlined',
  },
];
