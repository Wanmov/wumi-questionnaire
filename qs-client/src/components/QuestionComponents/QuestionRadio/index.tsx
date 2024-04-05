import styles from "./index.module.scss";

interface QuestionRadioProps {
  fe_id: string;
  props: {
    title: string;
    options: Array<{
      value: string;
      text: string;
    }>;
    value: string;
    isVertical: boolean;
  };
}

const QuestionRadio: React.FC<QuestionRadioProps> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props;

  return (
    <>
      <p>{title}</p>
      <ul className={styles.list}>
        {options.map((opt) => {
          const { value: val, text } = opt;

          return (
            <li
              key={val}
              className={isVertical ? styles.vertical : styles.horizontal}
            >
              <label>
                <input
                  type="radio"
                  name={fe_id}
                  value={val}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionRadio;
