import { Empty, Spin, Typography } from 'antd';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import QuestionCard from '../../../components/QuestionCard';
import ListSearch from '../../../components/ListSearch';
import { getQuestionList } from '../../../services/question';
import styles from './index.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../../utils/constans';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const List: React.FC = () => {
  useTitle('乌米问卷 - 我的问卷');

  const [questionList, setQuestionList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  useEffect(() => {
    setPage(1);
    setQuestionList([]);
    setTotal(0);
  }, [keyword]);

  const { run: runLoadMoreQuestionList, loading } = useRequest(getQuestionList, {
    manual: true,
    onSuccess: (res) => {
      const { list = [], total = 0 } = res;
      setQuestionList(questionList.concat(list));
      setTotal(total);
      setPage(page + 1);
    }
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { run: runTryLoadMore } = useDebounceFn(
    () => {
      const loadMoreEle = loadMoreRef.current;
      const domRect = loadMoreEle!.getBoundingClientRect();
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        runLoadMoreQuestionList({ page, pageSize: LIST_PAGE_SIZE, keyword });
      }
    },
    { wait: 1000 }
  );

  const hasMoreData = useMemo(() => {
    return total > questionList.length;
  }, [total, questionList]);

  useEffect(() => {
    runTryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (hasMoreData) window.addEventListener('scroll', runTryLoadMore);
    return () => {
      window.removeEventListener('scroll', runTryLoadMore);
    };
  }, [searchParams, hasMoreData]);

  const LoadMoreContent = useMemo(() => {
    if (loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    return hasMoreData ? <span>加载下一页中</span> : <span>没有更多了</span>;
  }, [loading, hasMoreData]);

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
        {questionList.length > 0 &&
          questionList.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreRef}>{LoadMoreContent}</div>
      </div>
    </div>
  );
};

export default List;
