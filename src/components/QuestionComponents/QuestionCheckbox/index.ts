import Component, { QuestionCheckboxDefaultProps } from './component';
import PropsComponent from './PropsComponent';

export * from './component';

export default {
  title: '多选',
  type: 'questionCheckbox', // 要和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionCheckboxDefaultProps
};
