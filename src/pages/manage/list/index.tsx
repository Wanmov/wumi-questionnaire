import { Spin, Typography } from 'antd';
import { useTitle } from 'ahooks';
import QuestionCard from '../../../components/QuestionCard';
import styles from './index.module.scss';
import ListSearch from '../../../components/ListSearch';
import { useGetQuestionList } from '../../../hooks/useGetQuestionList';

const { Title } = Typography;

const List: React.FC = () => {
  useTitle('乌米问卷 - 我的问卷');

  const { data = {}, loading } = useGetQuestionList();
  const { list = [], total = 0 } = data;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.searchBox}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.listContainer}>
        {loading && <Spin />}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item;
            return <QuestionCard key={_id} {...item} />;
          })}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default List;
