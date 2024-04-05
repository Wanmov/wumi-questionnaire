import { Typography, Radio, Space } from 'antd';

export interface OptionType {
  value: string;
  text: string;
}

export interface QuestionRadioProps {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;
  onChange?: (newProps: QuestionRadioProps) => void;
  disabled?: boolean;
}

export const QuestionRadioDefaultProps: QuestionRadioProps = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' }
  ],
  value: ''
};

const { Paragraph } = Typography;

const QuestionRadio: React.FC<QuestionRadioProps> = (props) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionRadio;
