import { useDispatch } from 'react-redux';
import { useGetQuestionData } from '@/hooks/useGetQuestionData';
import EditCanvas from './components/EditCanvas';
import EditHeader from './components/EditHeader';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { setCompState } from '@/store/modules/compReducer';
import styles from './index.module.scss';

const Edit: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useGetQuestionData();

  const clearSelectedId = () => {
    dispatch(setCompState({ selectedId: '' }));
  };

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.panelWrapper}>
            <LeftPanel />
          </div>
          <div className={styles.centerBox} onClick={clearSelectedId}>
            <div className={styles.canvasWrapper}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.panelWrapper}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
