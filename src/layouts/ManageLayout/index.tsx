import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useMemo } from 'react';

const ManageLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const buttonType = useMemo(
    () => (path: string) => {
      return pathname.startsWith(path) ? 'default' : 'text';
    },
    [pathname]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Button
            type={buttonType('/manage/list')}
            size="large"
            icon={<BarsOutlined />}
            onClick={(value) => {
              console.log('-->', value);
              navigate('/manage/list');
            }}>
            我的问卷
          </Button>
          <Button
            type={buttonType('/manage/star')}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              navigate('/manage/star');
            }}>
            星标问卷
          </Button>
          <Button
            type={buttonType('/manage/trash')}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              navigate('/manage/trash');
            }}>
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
