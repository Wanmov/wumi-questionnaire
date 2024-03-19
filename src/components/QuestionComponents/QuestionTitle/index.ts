import Component, { QuestionTitleDefaultProps } from './component';

export * from './component';

export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  defaultProps: QuestionTitleDefaultProps
};
