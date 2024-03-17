import { useState } from 'react';
import styles from './index.module.scss';
import { Empty, Spin, Typography } from 'antd';
import QuestionCard from '../../../components/QuestionCard';
import ListSearch from '../../../components/ListSearch';
import { useGetQuestionList } from '../../../hooks/useGetQuestionList';

const { Title } = Typography;

const Star: React.FC = () => {
  const { data = {}, loading } = useGetQuestionList({ isStar: true });
  const { list = [], total = 0 } = data;
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
        {loading && <Spin />}
        {!loading && list.length > 0 ? (
          list.map((item: any) => {
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
