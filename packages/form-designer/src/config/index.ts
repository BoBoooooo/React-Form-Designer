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
    mode: 'edit',
    script: 'changeModeToEdit',
  },
  {
    label: '预览模式',
    icon: 'SearchOutlined',
    divider: true,
    mode: 'preview',
    script: 'changeModeToPreview',
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
    script: 'handleClear',
  },
  {
    label: '自动绑定',
    icon: 'TagOutlined',
  },
];
