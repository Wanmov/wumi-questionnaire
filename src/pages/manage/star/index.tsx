import { useState } from 'react';
import styles from './index.module.scss';
import { Empty, Typography } from 'antd';
import QuestionCard from '../../../components/QuestionCard';
import ListSearch from '../../../components/ListSearch';

const { Title } = Typography;

const rowQuestionList = [
  { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 0, createAt: '3月10日 16:10' },
  { _id: 'q2', title: '问卷2', isPublished: true, isStar: true, answerCount: 5, createAt: '3月13日 17:20' },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 3, createAt: '3月14日 18:15' }
];

const Star: React.FC = () => {
  const [questionList, setQuestionList] = useState([...rowQuestionList]);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.searchBox}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.listContainer}>
        {questionList.length > 0 ? (
          questionList.map((item) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Star;
