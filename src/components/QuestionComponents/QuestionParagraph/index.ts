import Component, { QuestionParagraphDefaultProps } from './component';
import PropsComponent from './PropsComponent';

export * from './component';

export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps
};
