import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { useGetQuestionData } from '@/hooks/useGetQuestionData';
import { useSelector } from 'react-redux';
import { AppState } from '@/store';
import styles from './index.module.scss';
import { Button, Result, Spin } from 'antd';
import ComponentList from './components/ComponentList';
import AnswerStat from './components/AnswerStat';
import StatHeader from './components/StatHeader';
import ChartStat from './components/ChartStat';

const Stat: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useGetQuestionData();
  const { title, isPublished } = useSelector((state: AppState) => state.page);

  useTitle(`问卷统计 - ${title}`);

  // 状态提升
  const [seleCompId, setSeleCompId] = useState('');
  const [seleCompType, setSeleCompType] = useState('');

  const genContentElem = () => {
    return isPublished ? (
      <>
        <div className={styles.leftBox}>
          <ComponentList seleCompId={seleCompId} setSeleCompId={setSeleCompId} setSeleCompType={setSeleCompType} />
        </div>
        <div className={styles.main}>
          <AnswerStat seleCompId={seleCompId} setSeleCompId={setSeleCompId} setSeleCompType={setSeleCompType} />
        </div>
        <div className={styles.rightBox}>
          <ChartStat seleCompId={seleCompId} seleCompType={seleCompType} />
        </div>
      </>
    ) : (
      <div style={{ flex: '1' }}>
        <Result
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              返回
            </Button>
          }></Result>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles.contentWrapper}>
        {loading ? <Spin style={{ textAlign: 'center', marginTop: '60px' }} /> : genContentElem()}
      </div>
    </div>
  );
};

export default Stat;
