import { Link, Outlet } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import UserInfo from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../../router/constans';
import { AppState } from '../../store';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const { username } = useSelector((state: AppState) => state.user);
  const [pathName, setPathName] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) setPathName(MANAGE_INDEX_PATHNAME);
  }, [username]);

  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Link to={pathName}>
          <div className={styles.logo}>
            <Space>
              <Title level={3}>
                <FormOutlined />
              </Title>
              <Title level={3}>乌米问卷</Title>
            </Space>
          </div>
        </Link>

        <div className={styles.infoBox}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.mainContent}>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
