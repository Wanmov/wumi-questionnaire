import { Input, Typography } from 'antd';

export interface QuestionInputProps {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const QuestionInputDefaultProps: QuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入...'
};

const { Paragraph } = Typography;

const QuestionInput: React.FC<QuestionInputProps> = (props) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
