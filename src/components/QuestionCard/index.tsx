import styles from './index.module.scss';

interface QuestionCardProps {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
}

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { _id, title, createAt, answerCount, isPublished } = props;
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div></div>
        <div>
          {isPublished ? <span>已发布</span> : <span>未发布</span>}
          <span>答卷: {answerCount}</span>
          <span>{createAt}</span>
        </div>
      </div>
      <div className={styles.buttonBox}>
        <div>
          <button>编辑问卷</button>
          <button>数据统计</button>
        </div>
        <div>
          <button>标星</button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
