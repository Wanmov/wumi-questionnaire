import { Typography } from 'antd';

export interface QuestionTitleProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify';
  onChange?: (newProps: QuestionTitleProps) => void;
  disabled?: boolean;
}

export const QuestionTitleDefaultProps: QuestionTitleProps = {
  text: '一行标题',
  level: 1,
  textAlign: 'start'
};

const { Title } = Typography;

const QuestionTitle: React.FC<QuestionTitleProps> = (props) => {
  const { text, level, textAlign } = { ...QuestionTitleDefaultProps, ...props };

  const genFontSize = (level: number) =>
    ({
      1: '24px',
      2: '20px',
      3: '16px'
    })[level] || '16px';

  return (
    <Title
      level={level}
      style={{
        textAlign: textAlign,
        marginBottom: '0',
        fontSize: genFontSize(level as number)
      }}>
      {text}
    </Title>
  );
};

export default QuestionTitle;
