import { Typography, Space, Checkbox } from 'antd';

export interface OptionType {
  value: string;
  text: string;
  checked: boolean;
}

export interface QuestionCheckboxProps {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];
  onChange?: (newProps: QuestionCheckboxProps) => void;
  disabled?: boolean;
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxProps = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false }
  ]
};

const { Paragraph } = Typography;

const QiestionCheckbox: React.FC<QuestionCheckboxProps> = (props) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QiestionCheckbox;
