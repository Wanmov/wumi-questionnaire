import { Typography } from 'antd';

export type QuestionInfoProps = {
  title?: string;
  desc?: string;
  onChange?: (newProps: QuestionInfoProps) => void;
  disabled?: boolean;
};

export const QuestionInfoDefaultProps: QuestionInfoProps = {
  title: '问卷标题',
  desc: '问卷描述'
};

const { Title, Paragraph } = Typography;

const QuestionInfo: React.FC<QuestionInfoProps> = (props) => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props };

  const descTextList = desc.split('\n');

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
