import Component, { QuestionTitleDefaultProps } from './component';
import PropsComponent from './PropsComponent';

export * from './component';

export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionTitleDefaultProps
};
