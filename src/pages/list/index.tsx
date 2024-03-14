import { useState } from 'react';
import styles from './index.module.scss';
import QuestionCard from '../../components/QuestionCard';

const rowQuestionList = [
  { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 0, createAt: '3月10日 16:10' },
  { _id: 'q2', title: '问卷2', isPublished: true, isStar: false, answerCount: 5, createAt: '3月13日 17:20' },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 3, createAt: '3月14日 18:15' },
  { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 1, createAt: '4月10日 19:30' }
];

const List: React.FC = () => {
  const [questionList, setQuestionList] = useState([...rowQuestionList]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.searchBox}>搜索</div>
      </div>
      <div className={styles.listContainer}>
        {questionList.map((item) => {
          const { _id } = item;
          return <QuestionCard key={_id} {...item} />;
        })}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default List;
