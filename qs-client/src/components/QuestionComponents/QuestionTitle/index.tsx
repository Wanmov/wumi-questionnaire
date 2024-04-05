import React from "react";
import { CSSProperties } from "react";

interface QuestionTitleProps {
  text: string;
  level: number;
  isCenter?: boolean;
}

const QuestionTitle: React.FC<QuestionTitleProps> = ({
  text,
  level,
  isCenter,
}) => {
  const style: CSSProperties = {};
  if (isCenter) style.textAlign = "center";

  const TitleComp = {
    1: "h1",
    2: "h2",
    3: "h3",
  }[level];

  return TitleComp ? React.createElement(TitleComp, { style }, text) : null;
};

export default QuestionTitle;
