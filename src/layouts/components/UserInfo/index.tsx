import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../../../router/constans';
import { Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserInfo: React.FC = () => {
  const navgate = useNavigate();

  function logout() {
    localStorage.removeItem('USER_TOKEN');
    message.success('退出成功');
    navgate(LOGIN_PATHNAME);
  }

  return username ? (
    <span>
      <UserOutlined />
      {username}
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </span>
  ) : (
    <Link to={LOGIN_PATHNAME}>登录</Link>
  );
};

export default UserInfo;
