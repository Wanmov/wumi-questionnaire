import QuestionCheckboxConfig, { QuestionCheckboxProps } from './QuestionCheckbox';
import { QuestionCheckboxStatProps } from './QuestionCheckbox/StatComponent';
import QuestionInfoConfig, { QuestionInfoProps } from './QuestionInfo';
import QuestionInputConfig, { QuestionInputProps } from './QuestionInput';
import QuestionParagraphConfig, { QuestionParagraphProps } from './QuestionParagraph';
import QuestionRadioConfig, { QuestionRadioProps } from './QuestionRadio';
import { QuestionRadioStatProps } from './QuestionRadio/StatComponent';
import QuestionTextareaConfig, { QuestionTextareaProps } from './QuestionTextarea';
import QuestionTitleConfig, { QuestionTitleProps } from './QuestionTitle';

export type ComponentItemProps = QuestionTitleProps &
  QuestionInputProps &
  QuestionParagraphProps &
  QuestionInfoProps &
  QuestionTextareaProps &
  QuestionRadioProps &
  QuestionCheckboxProps;

type ComponentStatProps = QuestionCheckboxStatProps & QuestionRadioStatProps;

export type ComponentConfig = {
  title: string;
  type: string;
  Component: React.FC<ComponentItemProps>;
  PropsComponent: React.FC<ComponentItemProps>;
  defaultProps: ComponentItemProps;
  StatComponent?: React.FC<ComponentStatProps>;
};

const componentConfList: ComponentConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig
];

export const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionInfoConfig, QuestionParagraphConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig, QuestionTextareaConfig]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig]
  }
];

export function getCompConfigByType(type: string) {
  return componentConfList.find((comp) => comp.type === type);
}
