import QuestionInputConfig, { QuestionInputProps } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitleProps } from './QuestionTitle';

export type ComponentItemProps = QuestionTitleProps & QuestionInputProps;

export type ComponentConfig = {
  title: string;
  type: string;
  Component: React.FC<ComponentItemProps>;
  defaultProps: ComponentItemProps;
};

const componentConfList: ComponentConfig[] = [QuestionTitleConfig, QuestionInputConfig];

export function getCompConfigByType(type: string) {
  return componentConfList.find((comp) => comp.type === type);
}
