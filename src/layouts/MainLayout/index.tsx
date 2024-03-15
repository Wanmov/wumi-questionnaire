import { Outlet } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import UserInfo from '../components/UserInfo';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Space>
            <Title level={3}>
              <FormOutlined />
            </Title>
            <Title level={3}>乌米问卷</Title>
          </Space>
        </div>
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
