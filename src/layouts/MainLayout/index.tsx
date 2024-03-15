import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.loginBox}></div>
      </Header>
      <Content className={styles.mainContent}>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
