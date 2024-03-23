import { Typography, Input } from 'antd';

export type QuestionTextareaProps = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaProps) => void;
  disabled?: boolean;
};

export const QuestionTextareaDefaultProps: QuestionTextareaProps = {
  title: '输入框标题',
  placeholder: '请输入...'
};

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: React.FC<QuestionTextareaProps> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
