import { Link, Outlet } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import UserInfo from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router/constans';
import { AppState } from '@/store';
import styles from './index.module.scss';
import { useVerifyNav } from '@/hooks/useVerifyNav';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const { username } = useSelector((state: AppState) => state.user);
  const [pathName, setPathName] = useState(HOME_PATHNAME);

  useEffect(() => {
    username ? setPathName(MANAGE_INDEX_PATHNAME) : setPathName(HOME_PATHNAME);
  }, [username]);

  useVerifyNav();
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
      <Footer className={styles.footer}>乌米问卷</Footer>
    </Layout>
  );
};

export default MainLayout;
