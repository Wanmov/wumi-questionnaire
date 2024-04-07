import QuestionInput from "./QuestionInput";
import QuestionRadio from "./QuestionRadio";
import QuestionTitle from "./QuestionTitle";
import QuestionParagraph from "./QuestionParagraph";
import QuestionInfo from "./QuestionInfo";
import QuestionTextarea from "./QuestionTextarea";
import QuestionCheckbox from "./QuestionCheckBox";

interface ComponentProps {
  fe_id: string;
  type: string;
  isHidden: string;
  props: any;
}

const componentMap: { [key: string]: any } = {
  questionInput: QuestionInput,
  questionRadio: QuestionRadio,
  questionTitle: QuestionTitle,
  questionParagraph: QuestionParagraph,
  questionInfo: QuestionInfo,
  questionTextarea: QuestionTextarea,
  questionCheckbox: QuestionCheckbox,
};

export const getComponent = (comp: ComponentProps) => {
  const { fe_id, type, isHidden, props = {} } = comp;

  if (isHidden) return null;
  const Component = componentMap[type];
  
  return Component ? <Component key={fe_id} {...props} /> : null;
};
