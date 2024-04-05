import { Typography } from 'antd';

export interface QuestionParagraphProps {
  text?: string;
  isCenter?: boolean;
  onChange?: (newProps: QuestionParagraphProps) => void;
  disabled?: boolean;
}

export const QuestionParagraphDefaultProps: QuestionParagraphProps = {
  text: '一行段落',
  isCenter: false
};

const { Paragraph } = Typography;

const Component: React.FC<QuestionParagraphProps> = (props) => {
  const { text, isCenter } = { ...QuestionParagraphDefaultProps, ...props };

  const textList = text!.split('\n');

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default Component;
