interface QuestionParagraphProps {
  text: string;
  isCenter?: boolean;
}

const QuestionParagraph: React.FC<QuestionParagraphProps> = ({
  text,
  isCenter,
}) => {
  const textList = text.split("\n");

  return (
    <p style={{ textAlign: isCenter ? "center" : "left" }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </p>
  );
};

export default QuestionParagraph;
