import QuestionInputConfig, { QuestionInputProps } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitleProps } from './QuestionTitle';

export type ComponentItemProps = QuestionTitleProps & QuestionInputProps;

export type ComponentConfig = {
  title: string;
  type: string;
  Component: React.FC<ComponentItemProps>;
  PropsComponent: React.FC<ComponentItemProps>;
  defaultProps: ComponentItemProps;
};

const componentConfList: ComponentConfig[] = [QuestionTitleConfig, QuestionInputConfig];

export const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: []
  }
];

export function getCompConfigByType(type: string) {
  return componentConfList.find((comp) => comp.type === type);
}
