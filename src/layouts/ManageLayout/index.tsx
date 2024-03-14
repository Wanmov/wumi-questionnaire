import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const ManageLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button>创建问卷</button>
        <button>我的问卷</button>
        <button>星标问卷</button>
        <button>创建问卷</button>
        <button>回收站</button>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
