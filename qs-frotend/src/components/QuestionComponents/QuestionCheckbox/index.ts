import Component, { QuestionCheckboxDefaultProps } from './component';
import PropsComponent from './PropsComponent';
import StatComponent from './StatComponent';

export * from './component';

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropsComponent,
  StatComponent,
  defaultProps: QuestionCheckboxDefaultProps
};
