import { useGetQuestionData } from '../../../hooks/useGetQuestionData';
import EditCanvas from './components/EditCanvas';
import EditHeader from './components/EditHeader';
import LeftPanel from './components/LeftPanel';
import styles from './index.module.scss';

const Edit: React.FC = () => {
  const { loading } = useGetQuestionData();

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
